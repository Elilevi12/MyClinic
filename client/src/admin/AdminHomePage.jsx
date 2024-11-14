import { Link } from 'react-router-dom';
import "./css/adminHomePage.css";

function AdminHomePage() {
  return (
    <div className="admin-home-container">
      <h1>דף הבית למנהל</h1>
      <nav className="admin-home-nav">
        <Link to="calendar">
          <button>לוח שנה</button>
        </Link>
        <Link to="list-of-therapists">
          <button>רשימת מטפלים</button>
        </Link>
      </nav>
    </div>
  );
}

export default AdminHomePage;
