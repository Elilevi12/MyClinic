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
  headerTemplate:{
fontSize:10,
textAlign:"center",
marginBottom:4,
  },
  headerContainer: {
    marginBottom: 20,
    textAlign: "center",
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
    textAlign: "right", // כותרת בצד ימין
    marginBottom: 20
  },
  goal: {
    flexDirection: "row",
    fontSize: 18,
    color: "blue",
    textAlign: "right", // טקסט בצד ימין
  },
  textGoal: {
    fontSize: 14,
    textAlign: "right", // טקסט בצד ימין
flexDirection: "row",  
  },
  section: {
    marginBottom: 10,
    padding: 5,
  },
  footer: {
    fontSize: 10,
    textAlign: "center", // כותרת תחתונה בצד ימין
    left: 0,
    right: 0,
    bottom:0,
    
  },
});

// רכיב יצירת PDF
const ReportPDF = ({
  patientName,
  patientAge,
  treatmentSummary,
  treatmentProcess,
  background,
  patientIdNumber,
  educationalFramework,
  treatmentGoals,
  dateOfBirth,
  recommendations,
  healthcare_provider,
  specialty,
      therapistName,
      licenseNumber,
    
}) => (
  
  <Document>
    <Page size="A4" style={styles.page}>
    <View style={styles.headerContainer} fixed>
<Text style={styles.headerTemplate}>{patientName || "לא הוזן"}</Text>
<Text style={styles.headerTemplate}>{patientIdNumber || "לא הוזן"} ת.ז</Text>
</View>
      <Text style={styles.header}>דוח סיכום טיפול</Text>
      <View style={styles.section}>
        <Text style={styles.text}>שם: {patientName || "לא הוזן"}</Text>
        <Text style={styles.text}>תעודת זהות: {patientIdNumber|| "לא הוזן"}</Text>
        <Text style={styles.text}>תאריך לידה: {dateOfBirth || "לא הוזן"}</Text>
        <Text style={styles.text}>גיל המטופל: {patientAge || "לא הוזן"}</Text>
<Text style={styles.text}>קופת חולים: { healthcare_provider || "לא הוזן"}</Text>
        <Text style={styles.text}>מסגרת חינוכית: {educationalFramework || "לא הוזן"}</Text>
      </View>
       <View style={styles.section}>
          <Text style={styles.subtitle}>רקע</Text>
          <Text style={styles.text}>{background || "לא הוזן"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>מהלך הטיפול</Text>
        <Text style={styles.text}>{treatmentProcess || "לא הוזן"}</Text>
        </View>


      <View style={styles.section}>
        <Text style={styles.subtitle}>מטרות טיפול ומהלכו</Text>
        {treatmentGoals.map((goal, index) => (
          <View key={index}>
            
              <Text style={styles.textGoal}>.{index + 1} </Text>
              <Text style={styles.goal}>.{goal.goal}.</Text> 
              <Text style={styles.textGoal}>{goal.theTreatmentProcess} </Text>
              
          </View>
        ))}
      
      
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>סיכום</Text>
        <Text style={styles.text}>{treatmentSummary || "לא הוזן"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>המלצות</Text>
        <Text style={styles.text}>{ recommendations || "לא הוזן"}</Text>
      </View>


      <Text style={styles.footer}>בברכה</Text> 
      <Text style={styles.footer}>{therapistName}</Text>
      <Text style={styles.footer}>{specialty}</Text>
      <Text style={styles.footer}>{licenseNumber}</Text>
    </Page>
  </Document>
);

export default ReportPDF;
