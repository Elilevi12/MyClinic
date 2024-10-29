import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AdminHomePage from './admin/AdminHomePage'
import TherapistHomePage from './therapist/TherapistHomePage'
import PatientHomePage from './patient/PatientHomePage';
import Therapist from './therapist/TherapistHomePage';
import Login from './shared/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Login/>
    // < Management />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


