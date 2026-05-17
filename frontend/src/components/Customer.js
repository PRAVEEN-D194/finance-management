import { Navigate, useNavigate } from "react-router-dom";
import Payment from "./Payment";

export default function Customer({ customer }){
    const navigate = useNavigate();
    const oncl = ()=>{
        navigate(`/payment/${customer._id.toString()}`);
    }
    return <>
    <div className="customer-card">
    <div className="field">{customer.name}</div>
    <div className="field">{customer.totalAmount}</div>
    <div className="field"> {customer.interestPercent}</div>
    <div className="field"> {customer.remainingAmount}</div>
    <div className="field">{new Date(customer.createdAt).toLocaleDateString()}</div>

    <div className="actions">
        <button>Delete</button>
        <button onClick={oncl}>View</button>
    </div>
</div>
    </>
}