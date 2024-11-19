import React from "react";
import "../css/treatmentSeriesInitiator.css";

function TreatmentSeriesInitiator() {



  
  return (
    <div className="treatment-series-container">
      <div className="form-group">
        <label htmlFor="start-date">תאריך התחלה</label>
        <input type="date" id="start-date" className="input-field" />
      </div>

      <div className="form-group">
        <label htmlFor="treatment-time">שעת טיפול</label>
        <input type="time" id="treatment-time" className="input-field" />
      </div>

      <div className="form-group">
        <label htmlFor="number-of-treatments">מספר טיפולים</label>
        <input type="number" id="number-of-treatments" className="input-field" />
      </div>

      <div className="form-group">
        <label htmlFor="treatment-goals">מטרות</label>
        <textarea id="treatment-goals" className="textarea-field" placeholder="הכנס את מטרות הטיפול" rows="5" />
      </div>
    </div>
  );
}

export default TreatmentSeriesInitiator;
