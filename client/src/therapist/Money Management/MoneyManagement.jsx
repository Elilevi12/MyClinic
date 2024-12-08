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
      const response = await fetch(
        `http://localhost:3300/therapist/moneyManagement/paymentStatus/${therapistId.id}`
      );
      const data = await response.json();
      setPaymentStatus(data);
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
        headers: { "Content-Type": "application/json" },
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
      <h1>ניהול כספים</h1>
      {loading && <p>טוען נתונים...</p>}
      <table className={styles["payment-table"]}>
        <thead>
          <tr>
            <th>ת.ז</th>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>יתרת חוב</th>
          </tr>
        </thead>
        <tbody>
          {paymentStatus.map((patient) => (
            <tr
              key={patient.user_id}
              onClick={() => handlePatientSelect(patient)}
              className={styles.row}
            >
              <td>{patient.id_number}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td
                className={
                  patient.remaining_debt > 0
                    ? styles["debt-positive"]
                    : styles["debt-negative"]
                }
              >
                {patient.remaining_debt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className={styles.modal}>
          <h2>
            {selectedPatient.first_name} {selectedPatient.last_name}
          </h2>
          <h3>יתרת חוב: {selectedPatient.remaining_debt}</h3>
          {!actionType && (
            <div>
              <button onClick={() => setActionType("payment")}>
                הוספת תשלום
              </button>
              <button onClick={() => setActionType("debt")}>הוספת חוב</button>
            </div>
          )}
          {actionType && (
            <div>
              <h3>
                {actionType === "payment" ? "הוספת תשלום" : "הוספת חוב"}
              </h3>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                placeholder="הכנס סכום"
                ref={inputRef}
              />
              <div>
                <button onClick={handleAddAction}>שלח</button>
                <button onClick={() => setSelectedPatient(null)}>ביטול</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MoneyManagement;
