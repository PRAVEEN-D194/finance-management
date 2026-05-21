import axios from "axios";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

import { Navigate, useNavigate } from "react-router-dom";
export default function Payment({ payment, index , setpayment}) {
  const navigate = useNavigate();
  const ondelete = async ()=>{
    try{
       const id = payment._id
       const result = await Swal.fire({
        title: "Delete Payment?",
        text: "This data cannot be recovered!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete",
    })

    if (result.isConfirmed) {
        // delete api call
        const req = await axios.delete(`${process.env.REACT_APP_API_URL}/payment/${id}`);
        
        setpayment((prev) =>

        prev.filter((c) => c._id !== id));

        Swal.fire({
        title: "Deleted!",
        text: "Payment deleted successfully.",
        icon: "success",
        });
        toast.success("Payment deleted successfully please Reoload the page!!!");
    }
        
    }
    catch(err){
      console.log(err);
    }
    }


    const onupdate = ()=>{
      navigate(`/updatepayment/${payment._id}`)
    }

  return (
    <div className="Payment">
      <div>{index + 1}</div>
      <div>{payment.paidAmount}</div>
      <div> {payment.Paidinterest}</div>
      <div>{payment.remainingBalance}</div>
      <div>{new Date(payment.paidDate).toLocaleDateString()}</div>
      <div className="payment-actions">
    <div>
        <button className="delete" onClick={ondelete}>
            Delete
        </button>
    </div>
    </div>
    <div className="payment-actions">

    <div>
        <button className="update" onClick={onupdate}>
            Update
        </button>
    </div>
</div>
    </div>
  );
}