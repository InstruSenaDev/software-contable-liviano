import React from 'react';
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { obtenerFechaHora } from '../js/formatoFH'; // Importa la función que obtiene la fecha y hora actual
import { obtenerNombreUsuario } from '../js/nombreUsuario'; // Importa la función para obtener el nombre del usuario

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#1E40AF' },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row", backgroundColor: "#F3F4F6" },
  tableCol: { width: "11.11%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 8 },
  header: { marginBottom: 10, padding: 10, backgroundColor: "#E5E7EB", borderRadius: 8 },
  flexRow: { flexDirection: 'row', justifyContent: 'space-between' },
  textItem: { fontSize: 10, color: "#111827" },
  boldText: { fontSize: 10, fontWeight: 'bold', color: "#111827" },
  description: { marginVertical: 10, fontSize: 12, textAlign: 'justify', color: '#4B5563' },
});

const PDF = ({ data }) => {
  const { fecha, hora } = obtenerFechaHora(); // Obtener fecha y hora actual
  const nombreUsuario = obtenerNombreUsuario(); // Obtener nombre del usuario desde localStorage

  if (!data || data.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No hay datos disponibles para mostrar.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Text style={styles.boldText}>Registrador: </Text>
            <Text style={styles.textItem}>{nombreUsuario}</Text> {/* Mostrar el nombre dinámicamente */}
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.boldText}>Hora:</Text>
            <Text style={styles.textItem}>{hora}</Text> {/* Mostrar la hora dinámica */}
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.boldText}>Fecha:</Text>
            <Text style={styles.textItem}>{fecha}</Text> {/* Mostrar la fecha dinámica */}
          </View>
        </View>

        <Text style={styles.title}>Informe de Compras</Text>

        <Text style={styles.description}>
          Este informe muestra un resumen detallado de las compras realizadas durante el período seleccionado. 
          Incluye información relevante como el número de factura, monto total, descuentos aplicados, el total 
          a pagar, y detalles de los proveedores involucrados.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>No.Factura</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Monto total</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Descuento</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Total a pagar</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Proveedor</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Encargado</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>IVA</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Fecha</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>Cuentas</Text></View>
          </View>
          {data.map((compra, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.codigofactura || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.montototal || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.descuento || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.totalpagar || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.proveedor || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.encargado || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.iva || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.fecha || 'N/A'}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{compra.cuentas_utilizadas || 'N/A'}</Text></View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDF;
