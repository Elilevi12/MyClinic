import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ReportPDF from "./SummaryReportPdf";
import { useLocation } from "react-router-dom";


const TreatmentForm = () => {
  const location = useLocation(); // שימוש ב-useLocation כדי לקבל את ה-state
  const { serialID } = location.state || {}; // שליפת ה-serialID מה-state
const [currentPatient,setCurrentPatient] = useState(null);
const [currentTherapist, setCurrentTherapist] = useState(null);
const [treatmentGoals, setTreatmentGoals] = useState([]);
const [educationalFramework, setEducationalFramework] = useState("");
const [background, setBackground] = useState("");
const [treatmentDocumentation, setTreatmentDocumentation] = useState("");
  const [treatmentSummary, setTreatmentSummary] = useState("");
const [treatmentProcess, setTreatmentProcess] = useState("");
const [recommendations, setRecommendations] = useState("");


useEffect(() => {
const patient = JSON.parse(localStorage.getItem("selectedPatient"));
const therapist= JSON.parse(localStorage.getItem("currentUser"));


const fetchPatient = async () => {
  const response = await fetch(
    `http://localhost:3300/therapist/getPatient/${patient.patientId}`
  );
  const data = await response.json();
  setCurrentPatient(data);
};
const fetchTherapist = async () => {
  const response = await fetch(
    `http://localhost:3300/therapist/getTherapist/${therapist.id}`
  );
  const data = await response.json();
  setCurrentTherapist(data);  

  
}

const fetchGoals = async () => {
  const response = await fetch(
    `http://localhost:3300/therapist/activSeries/getGoalsActiveSession/${serialID}`
  );
  const data = await response.json();
  try {
  const formattedGoals = data.map((item) => ({
    goal: item.goal,
    theTreatmentProcess: "", // ברירת מחדל
  }));

  setTreatmentGoals(formattedGoals); // עדכון הסטייט
} catch (error) {
  console.error("Error fetching goals:", error);
}
  
};



fetchPatient();
fetchTherapist();
fetchGoals();


}, []);
  


  const patientName = currentPatient ? `${currentPatient.first_name} ${currentPatient.last_name}` : "";
 
const dateOfBirth= currentPatient ? new Date(currentPatient.birth_date).toISOString().split("T")[0] : "";
const patientAge = dateOfBirth 
  ? ((new Date() - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 365)).toFixed(2)
  : "";
const  healthcare_provider= currentPatient ? currentPatient.healthcare_provider : "";
  const patientIdNumber= currentPatient ? currentPatient.id_number : "";
  
const therapistName = currentTherapist ? `${currentTherapist.first_name} ${currentTherapist.last_name}` : "";
const licenseNumber = currentTherapist ? currentTherapist.license_number : ""; 
const specialty= currentTherapist ? currentTherapist.specialty : "";




const updateGoal = (index, value) => {
  setTreatmentGoals((prevGoals) => {
    const updatedGoals = [...prevGoals];
    updatedGoals[index].theTreatmentProcess = value; // עדכון הערך של המטרה
    return updatedGoals;
  });
};


  const downloadPDF = async () => {
    
    
    const blob = await pdf(
      <ReportPDF
        patientName={patientName}
        patientAge={patientAge}
        dateOfBirth={dateOfBirth}
        patientIdNumber={patientIdNumber}
        treatmentSummary={treatmentSummary}
        treatmentProcess={treatmentProcess}
        educationalFramework={educationalFramework}
        background={background}
        treatmentGoals={treatmentGoals}
        treatmentDocumentation={treatmentDocumentation}
        recommendations={recommendations}
        healthcare_provider={healthcare_provider}
        specialty={specialty}
        therapistName={therapistName}
        licenseNumber={licenseNumber}
      />
    ).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TreatmentReport.pdf";
    link.click();
  };

  const previewPDF = async () => {
    console.log(treatmentGoals);
    
    const blob = await pdf(
      <ReportPDF
      patientName={patientName}
      patientAge={patientAge}
      dateOfBirth={dateOfBirth}
      patientIdNumber={patientIdNumber}
      treatmentSummary={treatmentSummary}
      treatmentProcess={treatmentProcess}
      educationalFramework={educationalFramework}
      background={background}
      treatmentGoals={treatmentGoals}
      treatmentDocumentation={treatmentDocumentation}
      recommendations={recommendations}
      healthcare_provider={healthcare_provider}
      specialty={specialty}
      therapistName={therapistName}
      licenseNumber={licenseNumber}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url); // פתיחת ה-PDF בחלון חדש
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/logo.png" alt="Clinic Logo" style={{ height: "50px" }} />
        <h1>דוח סיכום טיפול</h1>
      </header>

      <form>

      <div style={{marginBottom:"2px" }}>
<label > מסגרת חינוכית:</label>
<input type="text"
value={educationalFramework}
onChange={(e) => setEducationalFramework(e.target.value)}
placeholder="הכנס מסגרת חינוכית"
style={{width:"100%", padding:"8px", marginTop:"5px"}}

/>
</div>  

      <div style={{ marginBottom: "10px" }}>
            <label>רקע:</label>
            <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder="כתוב את הרקע"
                rows="9"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>

        <div style={{ marginBottom: "10px" }}>
            <label>מהלך הטיפול:</label>
            <textarea
                value={treatmentProcess}
                onChange={(e) => setTreatmentProcess(e.target.value)}
                placeholder="כתוב את תהליך הטיפול כאן"
                rows="9"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>

            <div style={{ marginBottom: "10px" }}>
  <label>מטרות הטיפול ומהלכו:</label>
  {treatmentGoals.map((goal, index) => (
    <div key={index} style={{ marginBottom: "10px" }}>
      <label>{index + 1}: {goal.goal}</label>
      <textarea
        value={goal.theTreatmentProcess}
        onChange={(e) => updateGoal(index, e.target.value)} // קריאה לפונקציה עם האינדקס והערך החדש
        placeholder="כתוב את התהליך כאן"
        rows="3"
        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
      />
    </div>
  ))}
</div>



        <div style={{ marginBottom: "10px" }}>
          <label>סיכום:</label>
          <textarea
            value={treatmentSummary}
            onChange={(e) => setTreatmentSummary(e.target.value)}
            placeholder="כתוב את סיכום הטיפול כאן"
            rows="5"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
            <label>המלצות:</label>
            <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                placeholder="כתוב את המלצות הטיפול כאן"
                rows="9"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>


      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={previewPDF} style={{ marginRight: "10px" }}>
          תצוגה מוקדמת
        </button>
        <button onClick={downloadPDF}>הורד PDF</button>
      </div>
    </div>
  );
};

export default TreatmentForm;
