import React,{ useContext, useEffect } from 'react';
import { Link } from "react-router-dom"
import { UserContext } from '../UserContext';
function LoginClient(){

    const { setUser } = useContext(UserContext);
    useEffect(() => {
   //  setUser({type:"admin"})
   setUser({type:"client"})
   
   
    
    },[])

    return(
        <div>

    <h1>Ny Clinic</h1>





<input type="text" placeholder="name"/>
<input type="password" placeholder="password"/>

<Link to={"/client"}>
<button>כניסה</button>
</Link>


 
        </div>
    )
}export default LoginClient