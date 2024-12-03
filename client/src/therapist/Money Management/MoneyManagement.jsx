import { useEffect, useRef, useState } from "react";
import "../css/moneyManagement.css";

function MoneyManagement() {
  const therapistId = JSON.parse(localStorage.getItem("currentUser"));

  const [paymentStatus, setPaymentStatus] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [actionType, setActionType] = useState(""); 

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
    const response = await fetch(
      `http://localhost:3300/therapist/moneyManagement/paymentStatus/${therapistId.id}`
    );
    const data = await response.json();
    setPaymentStatus(data);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setInputValue("");
    setActionType("");
  };

  const handleAddAction = async () => {
    if (actionType === "payment") {
      await addPayment(selectedPatient.user_id, inputValue);
    } else if (actionType === "debt") {
      await addDebt(selectedPatient.user_id, inputValue);
    }
    setSelectedPatient(null); 
  };

  const addPayment = async (user_id, payment) => {
    const response = await fetch(
      "http://localhost:3300/therapist/moneyManagement/addPayments",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, payment }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const addDebt = async (user_id, debt) => {
    const response = await fetch(
      "http://localhost:3300/therapist/moneyManagement/addDebts",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, debt }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>ניהול כספים</h1>
      <table className="payment-table">
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
            >
              <td>{patient.id_number}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td
  className={
    patient.remaining_debt > 0
      ? "debt-positive"
      : "debt-negative"
  }
>
  {patient.remaining_debt}
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className="modal">
          <h2>{selectedPatient.first_name} {selectedPatient.last_name}</h2>
            <h3>יתרת חוב: {selectedPatient.remaining_debt}</h3>
          {!actionType && (
            <div>
              <button onClick={() => setActionType("payment")}>הוספת תשלום</button>
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
                onChange={(e) => setInputValue(e.target.value)}
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
