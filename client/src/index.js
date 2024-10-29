import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Admin from './admin/AdminMain'
import therapisr from './therapist/TherapistMain'
import Patient from './patient/PatientMain';
import Therapist from './therapist/TherapistMain';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Admin/>
    // < Management />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


