import { useEffect, useState } from "react";
import styles from "../css/history.module.css" // ייבוא קובץ ה-CSS

function History() {
  const [history, setHistory] = useState([]); // שמירת ההיסטוריה ב-state
  const patient = JSON.parse(localStorage.getItem("selectedPatient"));

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
console.log(data);

      setHistory(data); 
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className={styles.historyContainer}>
      <h1 className={styles.title}>היסטוריית טיפולים</h1>
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
              <td>{treatment.status}</td>
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
    </div>
  );
}

export default History;
