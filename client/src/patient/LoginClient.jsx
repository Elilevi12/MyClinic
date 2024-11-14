import React,{ useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../UserContext';
function LoginClient(){
   const { setUser } = useContext(UserContext);
   const navigate = useNavigate(); 
    const [patient, setPatient] = useState({
        userName: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient((prevPatient) => ({
          ...prevPatient,
          [name]: value,
        }));
      };
 
    useEffect(() => {
   
   setUser({type:"client"})
   },[])

   const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3300/patient/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

      if (response.ok) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useNavigate("/client");
        alert("הנתונים נשלחו בהצלחה!");
      } else {
        alert("משתמש לא נמצא");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בשליחת הנתונים");
    }
  };





    return(
        <div>

    <h1>Ny Clinic</h1>





<input type="text" placeholder="name" name='userName' value={patient.userName} onChange={handleLogin}/>
<input type="password" placeholder="password" value={patient.password} onChange={handleChange}/>

<button onClick={handleLogin}> כניסה עם סיסמה</button>

<Link to={"/client"}>
<button >כניסה</button>
</Link>


 
        </div>
    )
}export default LoginClient