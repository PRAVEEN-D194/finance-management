import axios from "axios";
import { useEffect, useState } from "react"


export default function Addpayment({payment}){
    const [addpayment, setaddpayment] = useState([]);
    const onset = (e)=>{
        const name = e.target.name;
        setaddpayment((prev)=>{
            return {...prev, [name]:e.target.value}
        })
    }


    const butt = (e)=>{
        e.preventDefault();
        try{
           const payload = {
                ...addpayment,
                customerId: payment
            };
            const res = axios.post(`${process.env.REACT_APP_API_URL}/payment/${payment}`, payload)
            window.location.reload();

        }catch(err){
            console.log(err);
        }
    }
    return(
        <div class="customerpayment">
        <div className="payment">
            <div><input type="number" placeholder="paidAmount" name="paidAmount" onChange={onset}></input></div>
            <div> <input type="number" placeholder="paidInterest" name="Paidinterest" onChange={onset}></input></div>
            <div><input type="date" placeholder="paidDate" name="paidDate" onChange={onset}></input></div>
            <button onClick={butt}>Addpayment</button>
        </div>
        </div>
    )
}