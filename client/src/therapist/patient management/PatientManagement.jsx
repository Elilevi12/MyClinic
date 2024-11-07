
import { Link, Outlet } from "react-router-dom";

function PatientManagement() {
  return (
    <div>
      <nav>
        <Link to="add-patient">
          <button>הוספת לקוח</button>
        </Link>
       
        
       
<Link to="personal-file-patient">
          <button>תיק רפואי</button>
        </Link>

        <button>רשימת המתנה</button>
      </nav>

      {/* מציג את הרכיב המתאים בהתאם לנתיב */}
      <Outlet />
    </div>
  );
}

export default PatientManagement;
