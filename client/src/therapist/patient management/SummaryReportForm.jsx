import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ReportPDF from "./SummaryReportPdf";


const TreatmentForm = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [treatmentSummary, setTreatmentSummary] = useState("");
const [treatmentProcess, setTreatmentProcess] = useState("");

  // פונקציה להורדת ה-PDF
  const downloadPDF = async () => {
    const blob = await pdf(
      <ReportPDF
        patientName={patientName}
        patientAge={patientAge}
        treatmentSummary={treatmentSummary}
        treatmentProcess={treatmentProcess}
      />
    ).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TreatmentReport.pdf";
    link.click();
  };

  // תצוגה מקומית
  const previewPDF = async () => {
    const blob = await pdf(
      <ReportPDF
        patientName={patientName}
        patientAge={patientAge}
        treatmentSummary={treatmentSummary}
        treatmentProcess={treatmentProcess}
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
        <div style={{ marginBottom: "10px" }}>
          <label>שם המטופל:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="הכנס את שם המטופל"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>גיל המטופל:</label>
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            placeholder="הכנס את גיל המטופל"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
            <label>תהליך הטיפול:</label>
            <textarea
                value={treatmentProcess}
                onChange={(e) => setTreatmentProcess(e.target.value)}
                placeholder="כתוב את תהליך הטיפול כאן"
                rows="9"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            </div>

        <div style={{ marginBottom: "10px" }}>
          <label>סיכום טיפול:</label>
          <textarea
            value={treatmentSummary}
            onChange={(e) => setTreatmentSummary(e.target.value)}
            placeholder="כתוב את סיכום הטיפול כאן"
            rows="5"
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
