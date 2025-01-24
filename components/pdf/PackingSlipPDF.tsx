import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 24,
    marginBottom: 20,
  },
  box: {
    border: "1 solid black",
    padding: 10,
    marginBottom: 20,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    border: "1 solid black",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  checkbox: {
    width: 15,
    height: 15,
    border: "1 solid black",
    marginRight: 5,
  },
});

export function PackingSlipPDF({ orderNumber, products }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Firefox</Text>
        <Text style={styles.orderNumber}>{orderNumber.replace("#", "")}</Text>

        <View style={styles.box}>
          <Text>Omega 3, Vitamin C, L-Arginin,{"\n"}Selen und B12 + Komplex</Text>
        </View>

        {[
          { num: "08", name: "Omega 3" },
          { num: "11", name: "Vitamin C" },
          { num: "16", name: "L-Arginin" },
          { num: "18", name: "Selen" },
          { num: "56", name: "Vitamin B12 + Komplex" },
        ].map((product) => (
          <View key={product.num} style={styles.row}>
            <View style={styles.circle}>
              <Text>{product.num}</Text>
            </View>
            <Text>{product.name}</Text>
          </View>
        ))}

        <Text style={{ marginTop: 20, marginBottom: 10 }}>
          Endkontrolle vor Endverpackung / Passt alles zusammen?
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[
            "Richtiger Name\nauf Verpackung?",
            "Richtiger Name\nauf Tagespacks?",
            "Richtiger Name\nauf Aufkleber?",
          ].map((label, i) => (
            <View key={i} style={{ width: "30%" }}>
              <View style={styles.checkbox} />
              <Text style={{ marginTop: 5 }}>{label}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
