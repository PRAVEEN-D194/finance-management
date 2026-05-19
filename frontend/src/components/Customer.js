import { Navigate, useNavigate } from "react-router-dom";
import Payment from "./Payment";
import axios from "axios";
import Swal from "sweetalert2";

export default function Customer({ customer, setcustomer }){
    const navigate = useNavigate();
    const oncl = ()=>{
        navigate(`/payment/${customer._id.toString()}`);
    }
    const ondelete = async(id)=>{

        // const confirmDelete = window.confirm(
        //     "Are you sure you want to delete?"
        // );
        // // If user clicks NO
        // if (!confirmDelete) {
        //     return;
        // }

        


    const result = await Swal.fire({
        title: "Delete Customer?",
        text: "This data cannot be recovered!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
    })

    if (result.isConfirmed) {
        // delete api call
        const req = await axios.delete(`${process.env.REACT_APP_API_URL}/customer/${id}`)
        
        setcustomer((prev) =>
        prev.filter((c) => c._id !== id));

        Swal.fire({
        title: "Deleted!",
        text: "Customer deleted successfully.",
        icon: "success",
        });
    }
        
    }

    const onupdate = ()=>{
        navigate(`/update/${customer._id.toString()}`);
    }
    return <>
    <div className="customer-card">
    <div className="field">{customer.name}</div>
    <div className="field">{customer.totalAmount}</div>
    <div className="field"> {customer.interestPercent}</div>
    <div className="field"> {customer.remainingAmount}</div>
    <div className="field">{new Date(customer.createdAt).toLocaleDateString()}</div>

    <div className="actions">
        
        <button onClick={() => ondelete(customer._id)}>Delete</button>
        <button onClick={onupdate}>update</button>
        <button onClick={oncl}>View</button>
    </div>
</div>
    </>
}