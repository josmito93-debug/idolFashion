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
  const roleLower = (data.role || '').toLowerCase()
  const isAccreditation = data.formType === 'accreditation'
  const isDesigner = roleLower === 'designer'
  const isModel = roleLower === 'model'
  const isGeneral = !isDesigner && !isModel
  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <Document title={`Contrato - ${data.fullName}`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>IDOL FASHION</Text>
            <Text style={styles.subtitle}>
              {isAccreditation ? 'Media Accreditation Protocol' : 
               isDesigner ? 'Contrato de Participación para Diseñadores' : 
               isModel ? 'Master Services & Talent Agreement' : 
               'Acuerdo de Colaboración y Liberación de Responsabilidad'}
            </Text>
            <Text style={{ fontSize: 7, color: '#cccccc', marginTop: 5 }}>REF: {data.contractId || `IF-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`}</Text>
          </View>
          {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
        </View>

        <View style={{ marginBottom: 12, textAlign: 'center' }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>
            {isDesigner ? 'CONTRATO DE PARTICIPACIÓN Y CESIÓN DE DERECHOS (DESIGNER)' : 
             isGeneral ? 'ACUERDO DE COLABORACIÓN Y LIBERACIÓN DE RESPONSABILIDAD' :
             'CONTRATO INTEGRAL DE PARTICIPACIÓN Y LIBERACIÓN DE RESPONSABILIDAD'}
          </Text>
          <Text style={{ fontSize: 7, color: '#666', marginTop: 2 }}>IDOL JOSE GROUP LLC & EMPRESAS AFILIADAS</Text>
        </View>

        {/* I. PARTIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Identificación de las Partes</Text>
          <View style={styles.row}>
            <Text style={styles.label}>{isDesigner ? 'Nombre Legal / Marca:' : 'Nombre Legible:'}</Text>
            <Text style={styles.value}>{data.fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DNI / Tax ID / Pasaporte:</Text>
            <Text style={styles.value}>{data.idNumber || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estatus:</Text>
            <Text style={styles.value}>{roleLower.toUpperCase()} // ELITE-LAB-PROTOCOL</Text>
          </View>
        </View>

        {/* II. FINANCIAL & LIABILITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Disposiciones Financieras y Responsabilidad</Text>
          <Text style={styles.boldLegalText}>PAGOS NO REEMBOLSABLES:</Text>
          <Text style={styles.legalText}>
            Todos los pagos, tarifas y depósitos realizados a favor de Idol Jose Group LLC tienen carácter estrictamente no reembolsables. No se emitirán reembolsos ni créditos bajo ninguna circunstancia.
          </Text>
          <Text style={styles.boldLegalText}>LIMITACIÓN DE RESPONSABILIDAD Y EXONERACIÓN:</Text>
          <Text style={styles.legalText}>
            LA COMPAÑÍA no será responsable por lesiones personales o pérdida de propiedad durante el desempeño de las actividades. {isGeneral && 'LA COMPAÑÍA no se hace responsable por la pérdida, robo o daño de equipos profesionales (cámaras, lentes, iluminación, etc.) introducidos por EL PARTICIPANTE.'} EL PARTICIPANTE acuerda indemnizar a LA COMPAÑÍA ante cualquier reclamo.
          </Text>
        </View>

        {/* III. NDA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. No Divulgación y Confidencialidad (NDA)</Text>
          <Text style={styles.legalText}>
            EL PARTICIPANTE reconoce que tendrá acceso a información confidencial (secretos comerciales, diseños no publicados, logística). Se prohíbe la reproducción o divulgación sin consentimiento expreso por escrito de Idol Jose Group LLC.
          </Text>
        </View>

        {/* IV. IMAGE RIGHTS & IP */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Cesión de Derechos de Imagen y Propiedad Intelectual</Text>
          {isDesigner ? (
            <>
              <Text style={styles.legalText}>
                DERECHOS DE IMAGEN Y MARCA: El Diseñador otorga el derecho irrevocable de utilizar su nombre, logotipo y marca para fines promocionales y comerciales a perpetuidad en cualquier plataforma.
              </Text>
              <Text style={styles.legalText}>
                GARANTÍA DE ORIGINALIDAD: El Diseñador garantiza que los diseños son de su autoría original y asume responsabilidad total ante reclamos por plagio o infracción de marca.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.legalText}>
                USO DE IMAGEN: EL PARTICIPANTE otorga el derecho irrevocable, perpetuo y global para utilizar su imagen, voz y nombre con fines comerciales o editoriales sin compensación adicional ni regalías.
              </Text>
              {isGeneral && (
                <Text style={styles.legalText}>
                  PROPIEDAD DE OBRA (WORK-FOR-HIRE): Para fotógrafos y videógrafos, todo material capturado se considera "obra por encargo". EL PARTICIPANTE otorga una licencia de uso exclusiva y total a favor de LA COMPAÑÍA.
                </Text>
              )}
            </>
          )}
        </View>

        {/* V. ESTATUS & CONDUCTA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Estatus del Participante y Conducta</Text>
          <Text style={styles.legalText}>
            AGENTE INDEPENDIENTE: EL PARTICIPANTE declara que actúa como voluntario, prensa o contratista independiente y no como empleado. Asume el riesgo total de sus acciones.
          </Text>
          <Text style={styles.legalText}>
            CLÁUSULA DE MORAL: Cualquier declaración pública negativa, difamatoria o conducta inapropiada dará lugar a la terminación inmediata de su participación.
          </Text>
          {isDesigner && (
            <Text style={styles.legalText}>
              LOGÍSTICA Y CRONOGRAMAS: El seguro de las piezas es responsabilidad del Diseñador. Se exige cumplimiento estricto de horarios de fitting y ensayos.
            </Text>
          )}
        </View>

        {/* SIGNATURES */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            {data.signature && <Image src={data.signature} style={styles.signatureImage} />}
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Firma del Participante</Text>
              <Text style={{ fontSize: 7, marginTop: 2 }}>{data.fullName}</Text>
            </View>
          </View>
          
          <View style={styles.signatureBox}>
            {ownerSignature ? (
              <Image src={ownerSignature} style={styles.signatureImage} />
            ) : (
              <View style={{ height: 45, justifyContent: 'center' }}>
                <Text style={{ fontSize: 7, color: '#999', fontStyle: 'italic' }}>Authorized Digital Signature</Text>
              </View>
            )}
            <View style={styles.signatureLine}>
              <Text style={styles.signatureLabel}>Representante Autorizado</Text>
              <Text style={{ fontSize: 7, marginTop: 2 }}>IDOL JOSE GROUP LLC</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Este contrato se rige por las leyes del Estado de Florida. // MIAMI DESIGN DISTRICT // DORAL, FL</Text>
          <Text style={{ marginTop: 2 }}>Digitally Certified via IDOL-HUB on {currentDate}</Text>
        </View>
      </Page>

      {/* Si es modelo, agregamos una segunda página con las medidas */}
      {isModel && data.measurements && (
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>ANEXO: MEDIDAS Y ESPECIFICACIONES</Text>
            {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ficha Técnica de Talento</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {[
                { l: 'Estatura', v: data.measurements.height },
                { l: 'Calzado', v: data.measurements.shoe },
                { l: 'Talla', v: data.measurements.size },
                { l: 'Ojos', v: data.measurements.eyes },
                { l: 'Busto', v: data.measurements.bust },
                { l: 'Cintura', v: data.measurements.waist },
                { l: 'Cadera', v: data.measurements.hips },
                { l: 'Cabello', v: data.measurements.hair },
              ].map((m) => (
                <View key={m.l} style={{ width: '45%', marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingBottom: 5 }}>
                  <Text style={{ fontSize: 7, color: '#666', textTransform: 'uppercase' }}>{m.l}</Text>
                  <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{m.v || 'N/A'}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.footer}>IDOL JOSE GROUP LLC // MIAMI DESIGN DISTRICT // DORAL, FL</Text>
        </Page>
      )}
    </Document>
  )
}
