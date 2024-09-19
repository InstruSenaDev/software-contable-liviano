import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableCol: { width: "12.5%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});


const PDF = ({data}) => (

    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Informe de Compras</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>No.Factura</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Monto total</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Descuento</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Total pagar</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Proveedor</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Encargado</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>IVA</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Fecha</Text></View>
          </View>
          {data.map((compra, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.codigofactura}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.montototal}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.descuento}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.totalpagar}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.proveedor}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.encargado}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.iva}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.fecha}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  

export default PDF;
