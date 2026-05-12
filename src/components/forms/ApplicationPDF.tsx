import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer'

// Register fonts if needed, but standard ones are fine for a contract
// Font.register({ family: 'Helvetica', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e831e3',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e831e3',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 150,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  value: {
    fontSize: 10,
    color: '#000000',
    flex: 1,
  },
  legalText: {
    fontSize: 8,
    color: '#666666',
    marginTop: 20,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  signatureContainer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: 200,
    alignItems: 'center',
  },
  signatureImage: {
    width: 150,
    height: 60,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 5,
    width: '100%',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#999999',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  }
})

interface ApplicationPDFProps {
  data: any
  ownerSignature?: string
}

export const ApplicationPDF = ({ data, ownerSignature }: ApplicationPDFProps) => {
  const isAccreditation = data.formType === 'accreditation'
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>IDOL FASHION</Text>
            <Text style={styles.subtitle}>
              {isAccreditation ? 'Media Accreditation Protocol' : 'Elite Development Protocol'} // ID: {data.contractId || 'PENDING'}
            </Text>
          </View>
        </View>

        {/* Candidate Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isAccreditation ? 'Media Identity' : 'Candidate Profile'}</Text>
          <View style={styles.row}><Text style={styles.label}>Full Name:</Text><Text style={styles.value}>{data.fullName}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Email:</Text><Text style={styles.value}>{data.email}</Text></View>
          {data.phone && <View style={styles.row}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{data.phone}</Text></View>}
          {data.dob && <View style={styles.row}><Text style={styles.label}>DOB:</Text><Text style={styles.value}>{data.dob}</Text></View>}
          <View style={styles.row}><Text style={styles.label}>Portfolio/Social:</Text><Text style={styles.value}>{data.portfolio}</Text></View>
          {!isAccreditation && <View style={styles.row}><Text style={styles.label}>Role Applied:</Text><Text style={styles.value}>{data.role}</Text></View>}
        </View>

        {/* Measurements (if model) */}
        {!isAccreditation && data.role === 'model' && data.measurements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Measurements & Physical Profile</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Height: {data.measurements.height}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Shoe: {data.measurements.shoe}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Size: {data.measurements.size}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Eyes: {data.measurements.eyes}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Bust: {data.measurements.bust}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Waist: {data.measurements.waist}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Hips: {data.measurements.hips}</Text></View>
              <View style={{ width: '50%', marginBottom: 5 }}><Text style={styles.label}>Hair: {data.measurements.hair}</Text></View>
            </View>
          </View>
        )}

        {/* Experience / Additional Info */}
        {!isAccreditation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience & Background</Text>
            <View style={styles.row}><Text style={styles.label}>Previous Experience:</Text><Text style={styles.value}>{data.experience}</Text></View>
            <Text style={{ fontSize: 10, marginTop: 5 }}>Details:</Text>
            <Text style={{ fontSize: 9, color: '#444444', marginTop: 2 }}>{data.experienceDetails || 'None provided'}</Text>
          </View>
        )}

        {/* Legal Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <Text style={styles.legalText}>
            {isAccreditation 
              ? "The photographer/media representative agrees to maintain strict confidentiality regarding any collections, designs, or restricted areas. Real-time publication of backstage material is prohibited. Official tags and credits are required for all event coverage."
              : (data.role === 'model' 
                ? "I hereby grant IDOL JOSE GROUP LLC (IDOL FASHION / DORAL FASHION WEEK) the irrevocable right to use my image, voice, and name for promotional purposes. I understand that this relationship is as an independent contractor and not as an employee. I agree to the confidentiality terms and the no-show policy as outlined in the application portal."
                : "I agree to provide professional collaboration services to IDOL JOSE GROUP LLC. I commit to maintaining strict confidentiality regarding internal logistics, client databases, and designs. I authorize the use of my image for promotional purposes related to the events.")
            }
          </Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            {data.signature && <Image src={data.signature} style={styles.signatureImage} />}
            <Text style={styles.signatureLabel}>Candidate Signature</Text>
            <Text style={{ fontSize: 8, marginTop: 5 }}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.signatureBox}>
            {ownerSignature ? (
              <Image src={ownerSignature} style={styles.signatureImage} />
            ) : (
              <View style={{ height: 60 }} />
            )}
            <Text style={styles.signatureLabel}>Authorized Representative</Text>
            <Text style={{ fontSize: 8, marginTop: 5 }}>IDOL JOSE GROUP LLC (Idolfredo)</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          IDOL JOSE GROUP LLC // MIAMI, FL // IDOL-PROTOCOL-2026
        </Text>
      </Page>
    </Document>
  )
}

