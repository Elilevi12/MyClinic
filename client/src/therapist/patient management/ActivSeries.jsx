import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../css/activeSeries.module.css";
import SummaryReportForm from "./SummaryReportForm";

function ActiveSeries({ serialID }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSummaryReport, setShowSummaryReport] = useState(false);

  const navigate = useNavigate();

  const handleButtonGoals = () => {
    fetch(
      `http://localhost:3300/therapist/activSeries/getGoalsActiveSession/${serialID}`,
      { method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }
       }

    )
      .then((res) => res.json())
      .then((data) => {
        const formattedGoals = data
          .map((item, index) => `${index + 1}. ${item.goal}`)
          .join("\n");
        setModalContent(formattedGoals);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setModalContent("שגיאה בטעינת המטרות.");
        setIsModalOpen(true);
      });
  };

  const handleButtonDocumentation = () => {
    fetch(
      `http://localhost:3300/therapist/activSeries/getDocumentationActiveSession/${serialID}`,
      { method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        }}
    )
      .then((res) => res.json())
      .then((data) => {
        const formattedDocumentation = data
          .map((item, index) => `${index + 1}. ${item.documentation}`)
          .join("\n");
        setModalContent(formattedDocumentation);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching documentation:", error);
        setModalContent("שגיאה בטעינת תיעודי הטיפול.");
        setIsModalOpen(true);
      });
  };

  const handleButtonSummaryReport = () => {
    navigate("/therapist/money-management/summary-report", { state: { serialID } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setShowSummaryReport(false);
  };

  return (
    <div>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={handleButtonGoals}>מטרות</button>
        <button className={styles.button} onClick={handleButtonDocumentation}>תיעוד טיפול</button>
        <button className={styles.button} onClick={handleButtonSummaryReport}>דוח סיכום</button>
      </div>

      {isModalOpen && !showSummaryReport && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <pre>{modalContent}</pre>
            <button className={styles.button} onClick={closeModal}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveSeries;
