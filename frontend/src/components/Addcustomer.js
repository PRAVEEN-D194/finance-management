import { useState } from "react"
import axios from "axios";

export default function Addcustomer(){
    const [customer, setcustomer] = useState("");

    const setvalue = (e)=>{
        const name = e.target.name;
        setcustomer((prev)=>{
            return {
                ...prev, [name] : e.target.value
            }
        })
    }

    const onsub = async (e)=>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8000/api/v1/customer", customer);
            setcustomer({
                name : "",
                totalAmount : "",
                interestPercent :  "",
                remainingAmount : "",
                createdAt : ""

        })
            console.log("post successfully");
        }catch(err){
            console.log(err);
        }

    }
    return <>
    <div id="form">
    <form onSubmit={onsub}>
        <label>name:</label><input type="text" name="name" required="true" onChange={setvalue} value={customer.name}></input><br></br>
        <label>totalAmount:</label><input type="number" name="totalAmount" required="true" onChange={setvalue} value={customer.totalAmount}></input><br></br>
        <label>interestPercent:</label><input type="number" name="interestPercent" required="true" onChange={setvalue} value={customer.interestPercent}></input><br></br>
        <label>remainingAmount:</label><input type="number" name="remainingAmount" onChange={setvalue} value={customer.remainingAmount}></input><br></br>
        <label>date:</label><input type="date" name="createdAt" onChange={setvalue} value={customer.createdAt}></input><br></br>
        <button type="submit" >submit</button>
    </form>
    </div>
    </>
}