import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function TreatmentSeriesInitiator() {
  //     const location = useLocation();
  // console.log(location.patientName);

  // const { patientName, patientID } = location.state
  return (
    <div>
      <input type="date" placeholder="תאריך התחלה" />
      <input type="time" placeholder="שעת טיפול" />
      <input type="number" placeholder="מספר טיפולים"/>
      <textarea placeholder="מטרות" rows="15" cols="100" />
      
    </div>
  );
}

export default TreatmentSeriesInitiator;
