import Addcustomer from '../components/Addcustomer';
import Customer from '../components/Customer';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home(){

    const [customer, setcustomer] = useState([]);
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const res = await axios.get("http://localhost:8000/api/v1/customer");
                console.log(res.data);
                console.log(res.data.customer)
                setcustomer(res.data.customer);
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
        

    },[])
    return (<>
        <Addcustomer></Addcustomer>
         <div id="customercontainer">
                {customer.map((c) => (
                    <Customer customer={c} />
                ))}
            </div>
        </>)
}