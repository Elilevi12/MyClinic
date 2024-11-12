import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './css/therapistHomePage.css';

function TherapistHomePage() {
  return (
    <div className="therapist-home-container">
      <h1>Therapist Home Page</h1>
      <nav>
        <Link to="calendar">
          <button className="nav-button">לוח שנה</button>
        </Link>
        <Link to="patient-management">
          <button className="nav-button">ניהול לקוחות</button>
        </Link>
        <Link to="money-management">
          <button className="nav-button">ניהול כספים</button>
        </Link>
      </nav>

      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
}

export default TherapistHomePage;
