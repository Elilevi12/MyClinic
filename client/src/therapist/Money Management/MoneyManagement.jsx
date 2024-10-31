import { useState } from "react";
import ListOfDuties from "./ListOfDuties";
function MoneyManagement(){
    const [showListOfDuties,setShowListOfDuties]=useState(false)

function openListOfDuties(){
    setShowListOfDuties(!showListOfDuties)
}

    return (
        <div>
<button onClick={openListOfDuties}>רשימת חובות</button>
{showListOfDuties&&<ListOfDuties/>}
        </div>
    )
}export default MoneyManagement;