
import { Link, Outlet } from "react-router-dom";

function PatientManagement() {
  return (
    <div>
      <nav>
        <Link to="add-patient">
          <button>הוספת לקוח</button>
        </Link>
        <Link to="update-patient">
          <button>עדכון פרטי לקוח</button>
        </Link>
        <Link to="treatment-series">
          <button>ניהול יומן טיפולים</button>
        </Link>
        <button>העלאת מסמכים לתיקים אישיים</button>
        <button>רשימת המתנה</button>
      </nav>

      {/* מציג את הרכיב המתאים בהתאם לנתיב */}
      <Outlet />
    </div>
  );
}

export default PatientManagement;
