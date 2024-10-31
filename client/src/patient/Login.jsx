import { useState } from "react"

function Login(){

    const [showInputFields,setShowInputFields]=useState(false)

function openInputs(){
setShowInputFields(()=>(true))

}

    return(
        <div>
{!showInputFields&&
<>
    <h1>Ny Clinic</h1>
            <p>.....יתרונות המערכת</p>
<button onClick={openInputs}>אזור אישי</button>
</>}
    

{showInputFields&&
<>
<input type="text" placeholder="name"/>
<input type="password" placeholder="password"/>
<button>כניסה</button>
</>
 }
        </div>
    )
}export default Login