import { useState } from "react"
import axios from "axios";
import Swal from "sweetalert2";

export default function Addcustomer(){
    const [customer, setCustomers] = useState("");

    const setvalue = (e)=>{
        const name = e.target.name;
        setCustomers((prev)=>{
            return {
                ...prev, [name] : e.target.value
            }
        })
    }

    const onsub = async (e)=>{
        e.preventDefault();


        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/customer`, customer);
            
            Swal.fire({
                icon: "success",
                title: "Customer Added",
                text: "Customer added successfully"
                }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload();
                }

                });
            setCustomers({
                name : "",
                totalAmount : "",
                interestPercent :  "",
                remainingAmount : "",
                createdAt : ""

        })
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
        {/* <label>Paidinterest:</label><input type="number" name="paidinterest" onChange={setvalue} value={customer.paidinterest}></input><br></br> */}
        <label>date:</label><input type="date" name="createdAt" onChange={setvalue} value={customer.createdAt}></input><br></br>
        <button type="submit" >submit</button>
    </form>
    </div>
    </>
}