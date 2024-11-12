import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css';
function LandingPage() {
  return (
    <div className="landing-container">
      <h1>ברוכים הבאים</h1>
      <Link to="/login-client">
        <button className="landing-button">כניסת לקוחות</button>
      </Link>
      <Link to="/login-admin">
        <button className="landing-button">כניסת מנהל</button>
      </Link>
      <Link to="/login-therapist">
        <button className="landing-button">כניסת מטפל</button>
      </Link>
    </div>
  );
}

export default LandingPage;

