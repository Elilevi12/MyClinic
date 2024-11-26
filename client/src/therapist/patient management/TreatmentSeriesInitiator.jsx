import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/treatmentSeriesInitiator.css";

function TreatmentSeriesInitiator() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const patient = JSON.parse(localStorage.getItem("selectedPatient"));
 
  const [treatmentSeries, setTreatmentSeries] = useState({
    patientId: patient.patientId,
    therapistId: currentUser.userId,
    total_treatments : 0,
    comments: "",
  });

  console.log(patient);
  console.log(currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatmentSeries((series) => ({
      ...series,
      [name]: value,
    }));
  };


  const handleSubmit = async () => {
 try {
      const response = await fetch(
        "http://localhost:3300/therapist/activSeries/addTreatmentSession",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(treatmentSeries),
        }
      );

      if (response.ok) {
        alert("הפרטים נשמרו בהצלחה");
      } else {
        alert("שגיאה בשליחת הנתונים");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בשליחת הנתונים");
    }
  };



 


  return (
    <div className="treatment-series-container">
      <div className="form-group">
        <label htmlFor="number-of-treatments">מספר טיפולים</label>
        <input
          type="number"
          name="total_treatments"
          value={treatmentSeries.total_treatments}
          onChange={handleChange}
          id="treatment-number"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="treatment-comments">הערות</label>
        <textarea
          id="treatment-comments"
          className="textarea-field"
          name="comments"
          value={treatmentSeries.comments}
          onChange={handleChange}
          placeholder="הכנס הערות"
          rows="3"
        />
      </div>

      <button onClick={handleSubmit}>שלח</button>
      <Link to="/therapist/personal-file">
        <button>ביטול</button>
      </Link>
    </div>
  );
}

export default TreatmentSeriesInitiator;
