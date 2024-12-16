import { useEffect, useState } from "react";
import styles from "../css/history.module.css"; // ייבוא קובץ ה-CSS

function History() {
  const [history, setHistory] = useState([]); // שמירת ההיסטוריה ב-state
  const [errorMessage, setErrorMessage] = useState(""); // שמירת הודעת שגיאה או הודעה מתאימה
  const patient = JSON.parse(localStorage.getItem("selectedPatient"));

  // אובייקט מיפוי לתרגום סטטוס
  const statusTranslation = {
    done: "בוצע",
    cancellation: "בוטל",
    pending: "ממתין",
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/therapist/personalFilePatient/history/${patient.patientId}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();

      if (data.message) {
        // בדיקה אם מגיעה הודעה מהשרת במקום רשימת טיפולים
        setErrorMessage(data.message);
        setHistory([]); // ריקון ההיסטוריה אם אין טיפולים
      } else {
        setHistory(data); // שמירת ההיסטוריה אם קיימת
        setErrorMessage(""); // ניקוי הודעת השגיאה
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      setErrorMessage("שגיאה בטעינת ההיסטוריה"); // הצגת הודעה במקרה של שגיאה
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className={styles.historyContainer}>
      <h1 className={styles.title}>היסטוריית טיפולים</h1>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>תאריך</th>
              <th>סטטוס</th>
              <th>תיעוד</th>
            </tr>
          </thead>
          <tbody>
            {history.map((treatment) => (
              <tr key={treatment.id}>
                <td>{new Date(treatment.treatment_date).toLocaleDateString()}</td>
                <td>{statusTranslation[treatment.status] || treatment.status}</td>
                <td>
                  <div className={styles.textBox}>
                    {treatment.status === "done" ? (
                      treatment.documentation // הצגת תיעוד
                    ) : treatment.status === "cancellation" ? (
                      treatment.reason_for_cancellation // סיבת ביטול
                    ) : (
                      "אין פרטים זמינים"
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;
