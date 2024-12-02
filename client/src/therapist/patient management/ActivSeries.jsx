import { useState } from "react";
import "../css/activeSeries.css";
import "../css/myActiveSeries.css";
import SummaryReportForm from "./SummaryReportForm";
import { useNavigate } from "react-router-dom";

function ActiveSeries({ serialID }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSummaryReport, setShowSummaryReport] = useState(false); 

  const patient = JSON.parse(localStorage.getItem("selectedPatient"));
  const patientID = patient.patientId;

const navigate=useNavigate()

  const handleButtonGoals = () => {
    fetch(
      `http://localhost:3300/therapist/activSeries/getGoalsActiveSession/${25}`
    )
      .then((res) => res.json())
      .then((data) => {
        setModalContent(data[0].goals); //לעדכן כאן את פתיחת המטרות
        setIsModalOpen(true); // פתיחת ה-modal
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setModalContent("שגיאה בטעינת המטרות.");
        setIsModalOpen(true);
      });
  };

  const handleButtonDocumentation = () => {
    fetch(
      `http://localhost:3300/therapist/activSeries/getDocumentationActiveSession/${serialID}`
    )
      .then((res) => res.json())
      .then((data) => {
        // הצגת הרשימה עם מספור
        const formattedDocumentation = data
          .map((item, index) => `${index + 1}. ${item.documentation}`)
          .join("\n");
        setModalContent(formattedDocumentation);
        setIsModalOpen(true); // פתיחת ה-modal
      })
      .catch((error) => {
        console.error("Error fetching documentation:", error);
        setModalContent("שגיאה בטעינת תיעודי הטיפול.");
        setIsModalOpen(true);
      });
  };

  const handleButtonSummaryReport = () => {
    navigate("/therapist/money-management/summary-report", { state: { serialID } });
   
   
    // setShowSummaryReport(true); // הצגת הקומפוננטה SummaryReportForm
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setModalContent(""); 
    setShowSummaryReport(false);
  };

  return (
    <div>
      <button onClick={handleButtonGoals}>מטרות</button>
      <button onClick={handleButtonDocumentation}>תיעודי טיפול</button>
      <button onClick={handleButtonSummaryReport}>דוח סיכום</button>

   
      {/* {showSummaryReport && <SummaryReportForm />} */}

      {isModalOpen && !showSummaryReport && (
        <div className="modal-backdrop">
          <div className="modal">
            <pre>{modalContent}</pre>
            <button onClick={closeModal}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActiveSeries;
