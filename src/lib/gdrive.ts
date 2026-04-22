import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'),
  scopes: SCOPES,
});

export const drive = google.drive({ version: 'v3', auth });

/**
 * Fetches all folders within a parent folder.
 * Used for listing Events and Photographers.
 */
export async function getSubfolders(parentId: string) {
  try {
    const response = await drive.files.list({
      q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, webViewLink)',
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error fetching subfolders:', error);
    return [];
  }
}

/**
 * Fetches all image files within a folder.
 * Used for listing Photos.
 */
export async function getPhotosInFolder(folderId: string) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, thumbnailLink, webContentLink, imageMediaMetadata)',
    });
    return response.data.files || [];
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

/**
 * Downloads a file as a Buffer.
 */
export async function downloadFile(fileId: string): Promise<Buffer> {
  try {
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'arraybuffer' }
    );
    return Buffer.from(response.data as ArrayBuffer);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
}
