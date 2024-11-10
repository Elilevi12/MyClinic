import React, { useState, useEffect } from "react";
function WaitingList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(
        "http://localhost:3300/therapist/waitingList",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },body: JSON.stringify({therapist_id:1})
        } );
      const data = await response.json();
      setPatients(data);
console.log(data);

      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
    <div>
      <h1>Waiting List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "50%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>תאריך לידה</th>
              <th>מספר טיפולים מאושר</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patients, index) => (
              <tr key={patients.id}>
                <td>{index + 1}</td>
                <td>{patients.first_name}</td>
                <td>{patients.last_name}</td>
                <td>{patients.phone}</td>
                <td>{patients.email}</td>
                <td>{patients.birth_date}</td>
                <td>{patients.approved_treatments
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default WaitingList;
