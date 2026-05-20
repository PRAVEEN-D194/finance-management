import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";


export default function Addpayment({payment, remaining}){
    const [addpayment, setaddpayment] = useState([]);
    const onset = (e)=>{
        const name = e.target.name;
        setaddpayment((prev)=>{
            return {...prev, [name]:e.target.value}
        })
    }


    const butt = async (e)=>{
        e.preventDefault();
        try{
           const payload = {
                ...addpayment,
                customerId: payment
            };
            const paidamount = Number(payload.paidAmount) || 0 ;
            const paidinterest = Number(payload.Paidinterest) || 0;
            if(remaining <= 0 || (remaining - paidamount)  < 0){
                Swal.fire({
                        icon: "warning",
                        title: "Customer fininsh the barrowed amount or pay more then amount",
                        text: "Customer paid Full amount OR Customer paid more then  Total amount"
                    }).then((result) => {
    
                        if (result.isConfirmed) {
                        window.location.reload();
                    }            
                   });
                return;
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/payment/${payment}`, payload)
            Swal.fire({
                        icon: "success",
                        title: "Customer Added",                        
                        text: "Customer added successfully"
                    }).then((result) => {
    
                        if (result.isConfirmed) {
                        window.location.reload();
                    }            
                       });

        }catch(err){
            console.log(err);
        }
    }
    return(
        <div class="customerpayment">
        <div className="payment">
            <div><input type="number" placeholder="paidAmount" name="paidAmount" onChange={onset}></input></div>
            <div> <input type="number" placeholder="Paidintrest" name="Paidinterest" onChange={onset}></input></div>
            <div><input type="date" placeholder="paidDate" name="paidDate" onChange={onset}></input></div>
            <button onClick={butt}>Addpayment</button>
        </div>
        </div>
    )
}