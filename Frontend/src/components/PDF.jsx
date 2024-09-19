import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'row', backgroundColor: '#E4E4E4' },
  section: { margin: 10, padding: 10, flexGrow: 1 }
});

const PDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Informe de Compra</Text>
      </View>
      <View style={styles.section}>
        <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid ipsam sequi nihil quo laudantium doloremque velit temporibus consectetur veritatis soluta blanditiis expedita, tempora commodi quas odio voluptatem saepe autem distinctio sit? Qui earum porro quia eos placeat minima expedita, dignissimos repudiandae sapiente nisi dolorum officia dolor possimus accusamus. Magni neque eos perspiciatis impedit recusandae assumenda provident. Neque explicabo nesciunt earum fuga consequuntur eos amet perferendis deserunt voluptatem reiciendis atque aut, quas similique esse culpa vitae rem laboriosam, quo sint! Dicta dolore consequatur quam quod maiores. Aliquam, expedita iure? Soluta aspernatur voluptas, aliquid exercitationem repellat maiores dignissimos neque cumque saepe magnam.</Text>
      </View>
    </Page>
  </Document>
);

export default PDF;
