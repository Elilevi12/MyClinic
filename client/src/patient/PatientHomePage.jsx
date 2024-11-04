import { Link } from "react-router-dom"
function PatientHomePage(){
return(
    <div>
        <h1>Patient</h1>
        <Link to={"calendar"}>
           <button>לוח שנה</button>
        </Link>
        <button>מסמכים </button>
        <button>חובות</button>
    </div>
)

}export default PatientHomePage