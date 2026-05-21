import axios from "axios";
import { useState , useEffect, use} from "react"
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Updatecustomer (){
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomers] = useState({});

    useEffect(()=>{
    const getcustomer = async ()=>{
    
        const c = await axios.get(`${process.env.REACT_APP_API_URL}/customer/${id}`);
        setCustomers(c.data.customer);
   }
   getcustomer();
    }, [id])

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
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/customer/${id}`, customer);
            
            Swal.fire({
                icon: "success",
                title: "Customer Updated",
                text: "Customer Updated successfully"
                }).then((result) => {

                if (result.isConfirmed) {
                    navigate('/');
                }
                });
        }catch(err){
            console.log(err);
        }

    }
    
    return(
        <>
        <div id="form">
           <form onSubmit={onsub}>
                <label>Name:</label><input type="text" name="name" required="true" onChange={setvalue} value={customer.name || ""}></input><br></br>
                <label>Total Amount:</label><input type="number" name="totalAmount" required="true" onChange={setvalue} value={customer.totalAmount}></input><br></br>
                {/* <label>interestPercent:</label><input type="number" name="interestPercent" required="true" onChange={setvalue} value={customer.interestPercent}></input><br></br> */}
                {/* <label>remainingAmount:</label><input type="number" name="remainingAmount" onChange={setvalue} value={customer.remainingAmount}></input><br></br> */}
                <label>Date:</label><input type="date" name="createdAt" onChange={setvalue} value={customer.createdAt?.split("T")[0] || ""}></input><br></br>
                <button type="submit" >Update customer</button>
            </form>
        </div>

 
        </>
    )
}