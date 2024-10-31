import { useState } from "react"
import AddingPatient from "./AddingPatient"
import UpdatingPatient from "./UpdatingPatient"
import TreatmentSeriesInitiator from "./TreatmentSeriesInitiator"
function PatientManagement(){
const [showAddPatient,setShowAddPatient]=useState(false)
const [showUpdatingPatient,setShowUpdatingPatient]=useState(false)
const [showTreatmentSeriesInitiator,setShowTreatmentSeriesInitiator]=useState(false)

function openAddPatient(){
setShowAddPatient(!showAddPatient)

}
function openUpdatingPatient(){
    setShowUpdatingPatient(!showUpdatingPatient)

}
function openTreatmentSeriesInitiator(){
    setShowTreatmentSeriesInitiator(!showTreatmentSeriesInitiator)
}

return (
    <div>
<button onClick={openAddPatient}>הוספת לקוח</button>
<button onClick={openUpdatingPatient}>עדכון פרטי לקוח</button>
<button onClick={openTreatmentSeriesInitiator}>ניהול יומן טיפולים</button>
<button>העלאת מסמכים לתיקים אישיים</button>
<button>רשימת המתנה</button>
{showAddPatient&&<AddingPatient/>}
{showUpdatingPatient&&<UpdatingPatient/>}
{showTreatmentSeriesInitiator&&<TreatmentSeriesInitiator/>}
    </div>
)

}export default PatientManagement