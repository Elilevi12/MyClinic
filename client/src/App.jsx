import './app.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./shared/LandingPage";
import LoginClient from "./patient/LoginClient";
import LoginSecure from "./shared/LoginSecure";
import AdminHomePage from "./admin/AdminHomePage";

import Calendar from "./shared/Calendar";
import TherapistHomePage from "./therapist/TherapistHomePage";
import AddTherapist from "./admin/AddTherapist";
import AddingPatient from "./therapist/patient management/AddingPatient";
import UpdatingPatient from "./therapist/patient management/UpdatingPatient";
import PatientManagement from "./therapist/patient management/PatientManagement";
import TreatmentSeriesInitiator from "./therapist/patient management/TreatmentSeriesInitiator";
import MoneyManagement from "./therapist/Money Management/MoneyManagement";
import ListOfDuties from "./therapist/Money Management/ListOfDuties";

import PatientHomePage from "./patient/PatientHomePage";

function App() {
  return (
    <div className="app-container">
    
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-client" element={<LoginClient />} />
          <Route path="/login-authorized" element={<LoginSecure />} />
          <Route path="/therapist" element={<TherapistHomePage />} />
          
           <Route path="/therapist/Patient-Management/add-patient"element={<AddingPatient/>}/>
           <Route path="/therapist/Patient-Management/update-patient"element={<UpdatingPatient/>}/>
           <Route path="/therapist/Patient-Management/treatment-series"element={<TreatmentSeriesInitiator/>}/>
           <Route path="/therapist/patient-management/"element={<PatientManagement/>}/>
            <Route path="/therapist/calendar" element={<Calendar/>}/>

<Route path="/therapist/money-management" element={<MoneyManagement/>}/>
<Route path="/therapist/money-management/list-of-duties" element={<ListOfDuties/>}/>

<Route path="client" element={<PatientHomePage/>}/>
<Route path="client/calendar" element={<Calendar/>}/>

          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-therapist" element={<AddTherapist />} />
          <Route path="admin/calendar" element={<Calendar />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
