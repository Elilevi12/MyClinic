import { useEffect, useRef, useState } from "react";
import styles from "../css/moneyManagement.module.css";

function MoneyManagement() {
  const therapistId = JSON.parse(localStorage.getItem("currentUser"));
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    getPaymentStatus();
  }, []);

  useEffect(() => {
    if (actionType && inputRef.current) {
      inputRef.current.focus();
    }
  }, [actionType]);

  const getPaymentStatus = async () => {
    setLoading(true);
  
    try {
      console.log("Fetching payment status...");
      
      const response = await fetch(
        `http://localhost:3300/therapist/moneyManagement/paymentStatus`,
        {
          headers: {
             Authorization: localStorage.getItem("token"),

          },
        }
      );
      const data = await response.json();
      setPaymentStatus(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setInputValue("");
    setActionType("");
  };

  const handleAddAction = async () => {
    console.log("Adding action...");
    
    setLoading(true);
    try {
      if (actionType === "payment") {
        await updatePatientStatus(
          selectedPatient.user_id,
          "addPayments",
          inputValue
        );
        updateLocalPatient(selectedPatient.user_id, inputValue, "payment");
      } else if (actionType === "debt") {
        await updatePatientStatus(
          selectedPatient.user_id,
          "addDebts",
          inputValue
        );
        updateLocalPatient(selectedPatient.user_id, inputValue, "debt");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    } finally {
      setLoading(false);
      setSelectedPatient(null);
    }
  };

  const updatePatientStatus = async (user_id, endpoint, amount) => {
    await fetch(
      `http://localhost:3300/therapist/moneyManagement/${endpoint}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
         },
        body: JSON.stringify({ user_id, amount }),
      }
    );
  };

  const updateLocalPatient = (user_id, amount, type) => {
    setPaymentStatus((prev) =>
      prev.map((patient) =>
        patient.user_id === user_id
          ? {
              ...patient,
              remaining_debt:
                type === "payment"
                  ? patient.remaining_debt - amount
                  : patient.remaining_debt + amount,
            }
          : patient
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ניהול כספים</h1>
      {loading && <p className={styles.loadingText}>טוען נתונים...</p>}
      <table className={styles.paymentTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>ת.ז</th>
            <th className={styles.tableHeader}>שם פרטי</th>
            <th className={styles.tableHeader}>שם משפחה</th>
            <th className={styles.tableHeader}>יתרת חוב</th>
          </tr>
        </thead>
        <tbody>
          {paymentStatus.map((patient) => (
            <tr
              key={patient.user_id}
              onClick={() => handlePatientSelect(patient)}
              className={styles.row}
            >
              <td className={styles.tableCell}>{patient.id_number}</td>
              <td className={styles.tableCell}>{patient.first_name}</td>
              <td className={styles.tableCell}>{patient.last_name}</td>
              <td
                className={
                  patient.remaining_debt > 0
                    ? styles.debtPositive
                    : styles.debtNegative
                }
              >
                {patient.remaining_debt > 0
                  ? `${patient.remaining_debt}-`
                  : patient.remaining_debt * -1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className={styles.modal}>
          <h2 className={styles.modalHeader}>
            {selectedPatient.first_name} {selectedPatient.last_name}
          </h2>
          <h3 className={styles.modalSubHeader}>
            {selectedPatient.remaining_debt > 0
              ? `יתרת חוב: ${selectedPatient.remaining_debt}`
              : `זכות: ${selectedPatient.remaining_debt * -1}`}
          </h3>
          {!actionType && (
            <div className={styles.actionButtons}>
              <button
                className={styles.actionButton}
                onClick={() => setActionType('payment')}
              >
                הוספת תשלום
              </button>
              <button
                className={styles.actionButton}
                onClick={() => setActionType('debt')}
              >
                הוספת חוב
              </button>
            </div>
          )}
          {actionType && (
            <div className={styles.actionForm}>
              <h3 className={styles.actionFormHeader}>
                {actionType === 'payment' ? 'הוספת תשלום' : 'הוספת חוב'}
              </h3>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                placeholder="הכנס סכום"
                className={styles.input}
                ref={inputRef}
              />
              <div className={styles.modalButtons}>
                <button className={styles.submitButton} onClick={handleAddAction}>
                  שלח
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setSelectedPatient(null)}
                >
                  ביטול
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoneyManagement;
