import React from 'react';
import { Link } from 'react-router-dom';
function LoginSecure(){
return(
    <div>

<h2>כניסת מורשים</h2>
      <Link to="/therapist">
        <button>מטפל</button>
      </Link>
      <Link to="/admin">
        <button>מנהל</button>
      </Link>


<input type="text" placeholder="שם משתמש"/>
<input type="password" placeholder="סיסמה"/>
<input type="text" placeholder="תעודת זהות"/>
<button>שלח</button>
    </div>
)

}export default LoginSecure