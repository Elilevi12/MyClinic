import { useState } from "react";
import "../css/activeSeries.css";
import "../css/myActiveSeries.css";
function ActiveSeries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleButtonClick = (content) => {
    setModalContent(content); // קובע את תוכן החלון
    setIsModalOpen(true); // פותח את החלון
  };

  const closeModal = () => {
    setIsModalOpen(false); // סוגר את החלון
    setModalContent(""); // מנקה את התוכן
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("מטרות הטיפול מוצגות כאן")}>
        מטרות
      </button>
      <button onClick={() => handleButtonClick("תיעודי הטיפול מוצגים כאן")}>
        תיעודי טיפול
      </button>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>{modalContent}</p>
            <button onClick={closeModal}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActiveSeries;
