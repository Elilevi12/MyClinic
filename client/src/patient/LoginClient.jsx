import { Link } from "react-router-dom"
function LoginClient(){

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