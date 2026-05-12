import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    backgroundColor: '#000000',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 'auto',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 9,
    color: '#cccccc',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    backgroundColor: '#f5f5f5',
    padding: 4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eeeeee',
    paddingBottom: 2,
  },
  label: {
    width: 140,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#333333',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 9,
    color: '#000000',
    flex: 1,
  },
  legalText: {
    fontSize: 8,
    color: '#333333',
    marginTop: 5,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  boldLegalText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  signatureContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  signatureBox: {
    flex: 1,
    alignItems: 'center',
  },
  signatureImage: {
    width: 130,
    height: 45,
    marginBottom: 5,
    objectFit: 'contain',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    width: '100%',
    paddingTop: 5,
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 7,
    color: '#999999',
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#dddddd',
    paddingTop: 10,
  }
})

interface ApplicationPDFProps {
  data: any
  ownerSignature?: string
  logoBase64?: string
}

export const ApplicationPDF = ({ data, ownerSignature, logoBase64 }: ApplicationPDFProps) => {
  const isAccreditation = data.formType === 'accreditation'
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <Document title={`Contract - ${data.fullName}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>IDOL FASHION</Text>
            <Text style={styles.subtitle}>
              {isAccreditation ? 'Media Accreditation Protocol' : 'Elite Development Protocol'}
            </Text>
            <Text style={{ fontSize: 7, color: '#cccccc', marginTop: 5 }}>REF: {data.contractId || 'AUTO-GEN-2026'}</Text>
          </View>
          {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
        </View>

        <View style={{ marginBottom: 20, textAlign: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' }}>
            {isAccreditation ? 'Official Media Accreditation Agreement' : 'Master Services & Talent Agreement'}
          </Text>
        </View>

        {/* I. PARTIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Identification of Parties</Text>
          <View style={styles.row}><Text style={styles.label}>Legal Name:</Text><Text style={styles.value}>{data.fullName}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Email Address:</Text><Text style={styles.value}>{data.email}</Text></View>
          {data.phone && <View style={styles.row}><Text style={styles.label}>Contact Phone:</Text><Text style={styles.value}>{data.phone}</Text></View>}
          <View style={styles.row}><Text style={styles.label}>Industry Role:</Text><Text style={styles.value}>{isAccreditation ? 'MEDIA / PRESS' : (data.role || 'TALENT').toUpperCase()}</Text></View>
        </View>

        {/* II. PHYSICAL DATA (If model) */}
        {!isAccreditation && data.role === 'model' && data.measurements && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>II. Talent Specifications</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {[
                { l: 'Height', v: data.measurements.height },
                { l: 'Shoe', v: data.measurements.shoe },
                { l: 'Size', v: data.measurements.size },
                { l: 'Eyes', v: data.measurements.eyes },
                { l: 'Bust', v: data.measurements.bust },
                { l: 'Waist', v: data.measurements.waist },
                { l: 'Hips', v: data.measurements.hips },
                { l: 'Hair', v: data.measurements.hair },
              ].map((m) => (
                <View key={m.l} style={{ width: '25%', marginBottom: 5 }}>
                  <Text style={{ fontSize: 6, color: '#666', textTransform: 'uppercase' }}>{m.l}</Text>
                  <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{m.v || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* III. FINANCIAL & LIABILITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Financial & Liability Disclosures</Text>
          <Text style={styles.boldLegalText}>NON-REFUNDABLE PAYMENTS:</Text>
          <Text style={styles.legalText}>
            ALL PAYMENTS, FEES, AND DEPOSITS MADE TO IDOL JOSE GROUP LLC ARE STRICTLY NON-REFUNDABLE. NO REFUNDS OR CREDITS SHALL BE ISSUED UNDER ANY CIRCUMSTANCES.
          </Text>
          <Text style={styles.boldLegalText}>LIMITATION OF LIABILITY:</Text>
          <Text style={styles.legalText}>
            IDOL JOSE GROUP LLC SHALL NOT BE HELD LIABLE FOR PERSONAL INJURY OR PROPERTY LOSS DURING PERFORMANCE. THE UNDERSIGNED AGREES TO INDEMNIFY THE COMPANY FROM ALL CLAIMS.
          </Text>
        </View>

        {/* IV. CONFIDENTIALITY (NDA) - REINFORCED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Non-Disclosure & Confidentiality (NDA)</Text>
          <Text style={styles.legalText}>
            THE UNDERSIGNED ACKNOWLEDGES THAT DURING THE ENGAGEMENT, THEY WILL HAVE ACCESS TO CONFIDENTIAL INFORMATION, INCLUDING BUT NOT LIMITED TO: TRADE SECRETS, UNRELEASED DESIGNS, CLIENT DATABASES, LOGISTICS, AND PRODUCTION STRATEGIES. 
          </Text>
          <Text style={styles.legalText}>
            THE UNDERSIGNED AGREES TO MAINTAIN ABSOLUTE CONFIDENTIALITY AND NOT TO DISCLOSE, REPRODUCE, OR DISTRIBUTE ANY SUCH INFORMATION TO THIRD PARTIES OR VIA SOCIAL MEDIA WITHOUT EXPRESS WRITTEN CONSENT FROM IDOL JOSE GROUP LLC. BREACH OF THIS CLAUSE SHALL ENTITLE THE COMPANY TO SEEK IMMEDIATE INJUNCTIVE RELIEF AND LIQUIDATED DAMAGES.
          </Text>
        </View>

        {/* V. SIGNATURES */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            {data.signature && <Image src={data.signature} style={styles.signatureImage} />}
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Candidate Signature</Text>
              <Text style={{ fontSize: 7, marginTop: 2 }}>{data.fullName}</Text>
            </View>
          </View>
          
          <View style={styles.signatureBox}>
            {ownerSignature ? (
              <Image src={ownerSignature} style={styles.signatureImage} />
            ) : (
              <View style={{ height: 45, justifyContent: 'center' }}>
                <Text style={{ fontSize: 7, color: '#999', fontStyle: 'italic' }}>Authorized Electronic Signature</Text>
              </View>
            )}
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Authorized Representative</Text>
              <Text style={{ fontSize: 7, marginTop: 2 }}>IDOL JOSE GROUP LLC (Idolfredo)</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>IDOL JOSE GROUP LLC // MIAMI DESIGN DISTRICT // DORAL, FL</Text>
          <Text style={{ marginTop: 2 }}>Digitally Certified & Secured via IDOL-HUB on {currentDate}</Text>
        </View>
      </Page>
    </Document>
  )
}
