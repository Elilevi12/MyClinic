import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

function TherapistHomePage() {
  
  return (
    <div>
      <h1>Therapist Home Page</h1>
      <nav>
        <Link to="calendar">
          <button>לוח שנה</button>
        </Link>
        <Link to="patient-management">
          <button>ניהול לקוחות</button>
        </Link>
        <Link to="money-management">
          <button>ניהול כספים</button>
        </Link>
        <button>תיעוד טיפול</button>
        <button>כתיבת דוחות</button>
      </nav>

      {/* מציג את הרכיב המתאים לפי הנתיב */}
      <Outlet />
    </div>
  );
}

export default TherapistHomePage;
