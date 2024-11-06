import React,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginTherapist(){


  const { setUser } = useContext(UserContext);
 useEffect(() => {

setUser({type:"therapist"})


 
 },[])


 
  const { user } = useContext(UserContext);

  
return(
    <div>


      <Link to="/therapist">
        <button>מטפל</button>
      </Link>
   


<input type="text" placeholder="שם משתמש"/>
<input type="password" placeholder="סיסמה"/>
<input type="text" placeholder="תעודת זהות"/>
<button>שלח</button>
    </div>
)

}export default LoginTherapist