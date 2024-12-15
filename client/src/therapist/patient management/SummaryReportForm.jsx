import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import ReportPDF from "./SummaryReportPdf";
import { useLocation } from "react-router-dom";
import styles from '../css/TreatmentForm.module.css';  // Import the CSS module

const TreatmentForm = () => {
  const location = useLocation();
  const { serialID } = location.state || {};
  const [currentPatient, setCurrentPatient] = useState(null);
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
    const therapist = JSON.parse(localStorage.getItem("currentUser"));

    const fetchPatient = async () => {
      const response = await fetch(
        `http://localhost:3300/therapist/getPatient/${patient.patientId}`,
        { method: "GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        }
      );
      const data = await response.json();
      setCurrentPatient(data);
    };
    const fetchTherapist = async () => {
      const response = await fetch(
        `http://localhost:3300/therapist/getTherapist`,
        { method: "GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        }

      );
      const data = await response.json();
      setCurrentTherapist(data);
    };

    const fetchGoals = async () => {
      const response = await fetch(
        `http://localhost:3300/therapist/activSeries/getGoalsActiveSession/${serialID}`,
        { method: "GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          }
        }
      );
      const data = await response.json();
      try {
        const formattedGoals = data.map((item) => ({
          goal: item.goal,
          theTreatmentProcess: "", // Default value
        }));
        setTreatmentGoals(formattedGoals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchPatient();
    fetchTherapist();
    fetchGoals();
  }, []);

  const patientName = currentPatient
    ? `${currentPatient.first_name} ${currentPatient.last_name}`
    : "";
  const dateOfBirth = currentPatient
    ? new Date(currentPatient.birth_date).toISOString().split("T")[0]
    : "";
  const patientAge = dateOfBirth
    ? ((new Date() - new Date(dateOfBirth)) / (1000 * 60 * 60 * 24 * 365)).toFixed(2)
    : "";
  const healthcare_provider = currentPatient ? currentPatient.healthcare_provider : "";
  const patientIdNumber = currentPatient ? currentPatient.id_number : "";

  const therapistName = currentTherapist
    ? `${currentTherapist.first_name} ${currentTherapist.last_name}`
    : "";
  const licenseNumber = currentTherapist ? currentTherapist.license_number : "";
  const specialty = currentTherapist ? currentTherapist.specialty : "";

  const updateGoal = (index, value) => {
    setTreatmentGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals[index].theTreatmentProcess = value;
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
    window.open(url);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Clinic Logo" className={styles.logo} />
        <h1 className={styles.title}>דוח סיכום טיפול</h1>
      </header>

      <form>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>מסגרת חינוכית:</label>
          <input
            type="text"
            value={educationalFramework}
            onChange={(e) => setEducationalFramework(e.target.value)}
            placeholder="הכנס מסגרת חינוכית"
            className={styles.inputField}
          />
        </div>

        <div className={styles.textareaContainer}>
          <label className={styles.formLabel}>רקע:</label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            placeholder="כתוב את הרקע"
            className={styles.textareaField}
          />
        </div>

        <div className={styles.textareaContainer}>
          <label className={styles.formLabel}>מהלך הטיפול:</label>
          <textarea
            value={treatmentProcess}
            onChange={(e) => setTreatmentProcess(e.target.value)}
            placeholder="כתוב את תהליך הטיפול כאן"
            className={styles.textareaField}
          />
        </div>

        <div className={styles.textareaContainer}>
          <label className={styles.formLabel}>מטרות הטיפול ומהלכו:</label>
          {treatmentGoals.map((goal, index) => (
            <div key={index} className={styles.goalItem}>
              <label>{index + 1}: {goal.goal}</label>
              <textarea
                value={goal.theTreatmentProcess}
                onChange={(e) => updateGoal(index, e.target.value)}
                placeholder="כתוב את התהליך כאן"
                className={styles.goalTextArea}
              />
            </div>
          ))}
        </div>

        <div className={styles.textareaContainer}>
          <label className={styles.formLabel}>סיכום:</label>
          <textarea
            value={treatmentSummary}
            onChange={(e) => setTreatmentSummary(e.target.value)}
            placeholder="כתוב את סיכום הטיפול כאן"
            className={styles.textareaField}
          />
        </div>

        <div className={styles.textareaContainer}>
          <label className={styles.formLabel}>המלצות:</label>
          <textarea
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            placeholder="כתוב את המלצות הטיפול כאן"
            className={styles.textareaField}
          />
        </div>
      </form>

      <div className={styles.buttonContainer}>
        <button onClick={previewPDF} className={`${styles.button} ${styles.buttonSecondary}`}>
          תצוגה מוקדמת
        </button>
        <button onClick={downloadPDF} className={`${styles.button} ${styles.buttonPrimary}`}>
          הורד PDF
        </button>
      </div>
    </div>
  );
};

export default TreatmentForm;
