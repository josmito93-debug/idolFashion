import { tables } from './airtable';
import { downloadFile } from './gdrive';
import { sendDeliveryEmail, PhotoDelivery } from './email';

const MAX_ATTACHMENT_SIZE = 20 * 1024 * 1024; // 20MB

export async function processDelivery(orderId: string, email: string, userName: string) {
  try {
    // 1. Fetch Order Items and associated Photos
    // This is a simplified fetch - in production, we'd use relations
    const orderItems = await tables.orderItems
      .select({ filterByFormula: `{Order} = '${orderId}'` })
      .all();

    const photoDeliveries: PhotoDelivery[] = [];
    let totalSize = 0;

    for (const item of orderItems) {
      const photoId = (item.fields['Photo'] as string[])[0];
      const photoRecord = await tables.photos.find(photoId);
      
      const driveFileId = photoRecord.fields['Drive File ID'] as string;
      const fileName = photoRecord.fields['Name'] as string;
      const publicUrl = photoRecord.fields['Full Res URL'] as string;

      // For smart delivery, we fetch the buffer to check size
      const buffer = await downloadFile(driveFileId);
      totalSize += buffer.length;

      photoDeliveries.push({
        name: fileName,
        url: publicUrl,
        buffer: buffer,
      });
    }

    // 2. Decide: Attach or Link
    const useLinks = totalSize > MAX_ATTACHMENT_SIZE;

    // 3. Send Email
    const result = await sendDeliveryEmail(email, userName, photoDeliveries, useLinks);

    // 4. Update Delivery Record in Airtable
    const deliveries = await tables.deliveries
      .select({ filterByFormula: `{Order} = '${orderId}'` })
      .firstPage();

    if (deliveries.length > 0) {
      await tables.deliveries.update(deliveries[0].id, {
        'Delivery Status': result.success ? 'Delivered' : 'Failed',
        'Download Link': useLinks ? 'Multiple Links Sent' : 'Attached to Email',
      });
    }

    return result;
  } catch (error) {
    console.error('Delivery Processing Error:', error);
    throw error;
  }
}
