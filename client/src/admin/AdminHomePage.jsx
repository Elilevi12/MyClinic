
import { Link } from 'react-router-dom';

function AdminHomePage() {
  return (
    <div>
      <h1>AdminHomePage....</h1>
      <nav>
        <Link to="add-therapist">
          <button>הוסף מטפלים</button>
        </Link>
        <Link to="calendar">
          <button>לוח שנה</button>
        </Link>
        <button>רשימת מטפלים</button>
      </nav>

    </div>
  );
}

export default AdminHomePage;
