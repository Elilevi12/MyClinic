import React,{ useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function LoginAdmin(){


  const { setUser } = useContext(UserContext);
 useEffect(() => {
 setUser({type:"admin"})


 
 },[])


 
  const { user } = useContext(UserContext);

  
return(
    <div>

      <Link to="/admin">
        <button>מנהל</button>
      </Link>


<input type="text" placeholder="שם משתמש"/>
<input type="password" placeholder="סיסמה"/>
<input type="text" placeholder="תעודת זהות"/>
<button>שלח</button>
    </div>
)

}export default LoginAdmin