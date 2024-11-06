
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
        <Link to={"list-of-therapists"}>
        <button>רשימת מטפלים</button>
        </Link>
        
      </nav>

    </div>
  );
}

export default AdminHomePage;
