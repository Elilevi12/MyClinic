import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import AssistantRegular from "../fonts/Assistant-VariableFont_wght.ttf";

// רישום הגופן
Font.register({
  family: "Assistant", // שם הגופן (משתמשים בו ב-"fontFamily")
  src: AssistantRegular, // הנתיב לקובץ הגופן
  fonts: [
    {
      src: AssistantRegular,
    },
  ],
});

// סגנונות ל-PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Assistant", // שימוש בגופן העברי
    direction: "rtl", // מימין לשמאל
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.5,
    textAlign: "right", // טקסט בצד ימין
  },
  subtitle:{
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20

  },
  section: {
    marginBottom: 10,
    padding: 5,
  },
  footer: {
    fontSize: 10,
    textAlign: "center", // כותרת תחתונה בצד ימין
    position: "absolute",
    left: 0,
    right: 0,
  },
});

// רכיב יצירת PDF
const ReportPDF = ({
  patientName,
  patientAge,
  treatmentSummary,
  treatmentProcess,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>דוח סיכום טיפול</Text>
      <View style={styles.section}>
        <Text style={styles.text}>שם המטופל: {patientName || "לא הוזן"}</Text>
        <Text style={styles.text}>גיל המטופל: {patientAge || "לא הוזן"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>תהליך הטיפול:</Text>
        <Text style={styles.text}>{treatmentProcess || "לא הוזן"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>סיכום הטיפול:</Text>
        <Text style={styles.text}>{treatmentSummary || "לא הוזן"}</Text>
      </View>
      <Text style={styles.footer}>© 2024 My Clinic</Text> {/* כותרת תחתונה */}
    </Page>
  </Document>
);

export default ReportPDF;
