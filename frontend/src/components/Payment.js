import axios from "axios";
import Swal from "sweetalert2";
export default function Payment({ payment, index }) {
  
  const ondelete = async ()=>{
    console.log("deleted payment successfully");

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

        Swal.fire({
        title: "Deleted!",
        text: "Payment deleted successfully.",
        icon: "success",
        });
        window.location.reload();
    }
        
    }
      
      
    catch(err){
      console.log(err);
    }
    }

  return (
    <div className="Payment">
      <div>{index + 1}</div>
      <div>{payment.paidAmount}</div>
      <div> {payment.Paidinterest}</div>
      <div>{payment.remainingBalance}</div>
      <div>{new Date(payment.paidDate).toLocaleDateString()}</div>
      <div><button onClick={ ondelete }>delete</button></div>
    </div>
  );
}