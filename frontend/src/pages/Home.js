import Addcustomer from '../components/Addcustomer';
import Customer from '../components/Customer';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home(){

    const [customer, setcustomer] = useState([]);
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/customer`);
                setcustomer(res.data.customer);
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
        

    },[])
    return ( <>
    <Addcustomer />

    <div id="customercontainer">
        <div className="customer-card">
      <div className="field"><strong>Name:</strong></div>
      <div className="field"><strong>Total:</strong></div>
      <div className="field"><strong>Interest:</strong></div>

      <div className="field"><strong>Remaining:</strong></div>

      <div className="field"><strong>Date:</strong></div>
      <div>
        <strong>delete or View</strong>
    </div>
        </div>
      {customer.map((c, index) => (
        <Customer key={index} customer={c} />
      ))}
    </div>
  </>)
}