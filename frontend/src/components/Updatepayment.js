import axios from "axios";
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";


export default function Updatepayment(){
    const navigate = useNavigate();
    const [payment, setpayment] = useState({});
    const { id } = useParams();
    const onset = (e)=>{
        const name = e.target.name;
        setpayment((prev)=>{
            return{...prev, [name] : e.target.value}
        })
    }

    useEffect(()=>{
    const getpayment = async ()=>{
    
        const c = await axios.get(`${process.env.REACT_APP_API_URL}/singlepay/${id}`);
        setpayment(c.data.payment);
    }
    getpayment();
    }, [id])


    const onclic = async (e)=>{
        e.preventDefault();
        try{
            const customer = await axios.get(`${process.env.REACT_APP_API_URL}/customer/${payment.customerId}`);
            if(customer.data.customer.remainingAmount <= 0 || customer.data.customer.remainingAmount + payment.paidAmount < 0){
            Swal.fire({
                icon: "warning",
                title: "Customer fininsh the barrowed amount or pay more then amount",
            text: "Customer paid Full amount OR Customer paid more then  Total amount"
                }).then((result) => {
                    if (result.isConfirmed) {
                    navigate(-1);
                    }            
                });
            }else{
                
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/payment/${id}`, payment);
            Swal.fire({
                icon: "success",
                title: "Payment Updated",
                text: "Payment Updated successfully"
                }).then((result) => {
                   if (result.isConfirmed) {
                    navigate(-1);
                }
           })
            }
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <header>
        <h1>Finance Management</h1>
    </header>
        <div class="p-container">
        <div className="pay">
            <div><label>Paid Amount:</label><input type="number" placeholder="paidAmount" name="paidAmount" onChange={onset} value={payment.paidAmount || ""}></input></div>
            <div><label>Paid Interest:</label><input type="number" placeholder="Paidintrest" name="Paidinterest" onChange={onset} value={payment.Paidinterest || ""}></input></div>
            <div><label>Paid Date:</label><input type="date" placeholder="paidDate" name="paidDate" onChange={onset} value={payment.paidDate?.split("T")[0] || ""}></input></div>
            <button onClick={onclic}>Update Payment</button>
        </div>
        </div>
        </>
    )
}