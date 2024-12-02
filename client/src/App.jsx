import './app.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext';

import LandingPage from "./shared/LandingPage";
import LoginClient from "./patient/LoginClient";
import LoginTherapist from './therapist/LoginTherapist';
import AdminHomePage from "./admin/AdminHomePage";
import LoginAdmin from './admin/LoginAdmin';
import ListOfTherapists from './admin/ListOfTherapists';
import Calendar from "./shared/Calendar";
import TherapistHomePage from "./therapist/TherapistHomePage";
import AddTherapist from "./admin/AddTherapist";
import AddingPatient from "./therapist/patient management/AddingPatient";
import UpdatingPatient from "./therapist/patient management/UpdatingPatient";
import PersonalFile from "./therapist/patient management/PersonalFile";

import WaitingList from "./therapist/patient management/WaitingList";
import TreatmentSeriesInitiator from "./therapist/patient management/TreatmentSeriesInitiator";
import MoneyManagement from "./therapist/Money Management/MoneyManagement";
import ListOfDuties from "./therapist/Money Management/ListOfDuties";
import PersonalFilePatient from './therapist/patient management/PersonalFilePatient';
import PatientHomePage from "./patient/PatientHomePage";

import SummaryReportForm from "./therapist/patient management/SummaryReportForm";

function App() {
  return (
      <UserProvider>
    <div className="app-container">
  
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-client" element={<LoginClient />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-Therapist" element={<LoginTherapist />} />
          <Route path="/therapist" element={<TherapistHomePage />} />
          
           <Route path="/therapist/add-patient"element={<AddingPatient/>}/>
           <Route path="/therapist/personal-file-patient"element={<PersonalFilePatient/>}/>
           <Route path="/therapist/personal-file/update-patient"element={<UpdatingPatient/>}/>
           <Route path="/therapist/personal-file/treatment-series"element={<TreatmentSeriesInitiator/>}/>
            <Route path="/therapist/calendar" element={<Calendar/>}/>
<Route path="/therapist/waiting-list" element={<WaitingList/>}/>
<Route path="/therapist/personal-file" element={<PersonalFile/>}/>

<Route path="/therapist/money-management/summary-report" element={<SummaryReportForm/>}/>

<Route path="/therapist/money-management" element={<MoneyManagement/>}/>
<Route path="/therapist/money-management/list-of-duties" element={<ListOfDuties/>}/>

<Route path="client" element={<PatientHomePage/>}/>
<Route path="client/calendar" element={<Calendar/>}/>

          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/add-therapist" element={<AddTherapist />} />
          <Route path="admin/calendar" element={<Calendar />} />
          <Route path="admin/list-of-therapists" element={<ListOfTherapists />} />
        
        </Routes>
      </Router>
    </div>
    </UserProvider>
  );
}
export default App;
