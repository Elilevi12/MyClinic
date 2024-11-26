import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./css/therapistHomePage.css";

function TherapistHomePage() {
  return (
    <div className="therapist-home-container">
      <h1>Therapist Home Page</h1>
      <nav>
        <Link to="calendar">
          <button className="nav-button">לוח שנה</button>
        </Link>
        <Link to="personal-file-patient">
          <button className="nav-button">תיקי רפואי</button>
        </Link>

        <Link to="money-management">
          <button className="nav-button">ניהול כספים</button>
        </Link>

        <Link to={"waiting-list"}>
          <button>רשימת המתנה</button>
        </Link>

        <Link to={"add-patient"}>
          <button>הוספת לקוח</button>
        </Link>
      </nav>
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  );
}

export default TherapistHomePage;
