import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Payment from '../components/Payment';
import Addpayment from '../components/Addpayment';
import { Navigate, useNavigate } from "react-router-dom";
export default function CustomerPayment(){
    const [payment, setpayment] = useState([])
    const { id } = useParams();
    useEffect(()=>{
        const fetchdata = async ()=>{
            try{
                const res =await axios.get(`${process.env.REACT_APP_API_URL}/payment/${id}`);
                setpayment(res.data.payment);
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
    },[])


    const [customer, setcustomer] = useState({});
  useEffect(()=>{
          const fetchdata = async()=>{
              try{
                  const res = await axios.get(`${process.env.REACT_APP_API_URL}/customer/${id}`);
                  setcustomer(res.data.customer);
              }catch(err){
                  console.log(err);
              }
          }
          fetchdata();
      },[])

    const Totalpaid =
    (customer.totalAmount || 0) +
    (((customer.totalAmount || 0) *
      (customer.interestPercent || 0)) / 100) -
    (customer.remainingAmount || 0);
        const getPDF = async (id) => {

            try {

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/pdf/${id}`,
                    {
                        responseType: "blob"
                    }
                );

                // Create PDF URL
                const fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {
                        type: "application/pdf"
                    })
                );

                // Open PDF in new tab
                window.open(fileURL, "_blank");

            } catch (err) {

                console.log(err);

            }
        };
    return(
        <>
        <div className='Customerdetials'>
            <h1>Name:  {customer.name}</h1>
            <h1>Total Amount:  Rs.{customer.totalAmount}</h1>
            <h1>Total Paid Amount:  Rs.{Totalpaid}</h1>
            <h1>remaining Amount:  Rs.{customer.remainingAmount}</h1>
      </div>
        <div className="customerpayment">
            <div className="Payment">
            <div><strong>si.no</strong></div>
            <div><strong>paid amount</strong></div>
            <div><strong>paid interest</strong> </div>
            <div><strong>remainingBalance</strong></div>
            <div><strong>paid date</strong> </div>
            </div>
            {payment.map((p, index) => (
                <Payment key={index} payment={p} index={index} />
        ))}
        </div>
        <div className='but'>
            <button onClick={() => getPDF(customer._id)}>get PDF</button>
        </div>
        <Addpayment payment={id}></Addpayment>
        </>
    )
}