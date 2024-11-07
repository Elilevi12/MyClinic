import { useState } from "react"
import { Link } from "react-router-dom"

function PersonalFilePatient(){
const [showPersonalFile, setShowPersonalFile] = useState(false)

    return(
    <div>
        <button onClick={()=>setShowPersonalFile(!showPersonalFile)}>קובץ אישי</button>
        <input type="text" placeholder="שם מטופל"/>
{showPersonalFile && <>
<button>מטרות</button>
<button>תיעוד טיפול</button>
<Link to="update-patient">
<button>עדכון פרטים אישיים</button>
</Link>
<Link to="treatment-series">
          <button>ניהול יומן טיפולים</button>
        </Link>
<button>אבחון</button>
<button>דוח סיכום</button>
<button>העלאת מסמכים לתיקים אישיים</button>
</>}


    </div>
)

}export default PersonalFilePatient