import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

function PDF() {
  return (
    <Document>
      <page size={"A5"}>
        <View>
          <text>Informes</text>
        </View>
      </page>
    </Document>
  );
}
export default PDF;
