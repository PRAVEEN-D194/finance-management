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


    // // Calculations
    // const totalAmount = customer.totalAmount || 0;

    // const interestPercent = customer.interestPercent || 0;

    // const remainingAmount = customer.remainingAmount || 0;

    // const paidinterest = customer.paidinterest || 0;

    // const paidAmount = customer.paidAmount || 0;
    // // Interest amount
    // const interestAmount =
    //     (remainingAmount * interestPercent) / 100;

    // // Total amount with interest
    // const totalWithInterest =
    //     totalAmount + interestAmount;

    // // Paid amount
    // const Totalpaid =
    //     totalAmount - remainingAmount;

    // const paidprinciple = payment.paidAmount;
    

    // const paidPercent =
    // Math.round((Totalpaid / totalWithInterest) * 100);

    // const remainingPercent =
    // Math.round((remainingAmount / totalWithInterest) * 100);

 // ================= BASE VALUES =================
const totalAmount = customer.totalAmount || 0;
const interestPercent = customer.interestPercent || 0;

const remainingAmount = customer.remainingAmount || 0;

// paid values from DB
const paidInterest = customer.paidinterest || 0;
const paidPrincipal = (customer.totalAmount - customer.remainingAmount) || 0;
// ================= INTEREST CALCULATION =================
// current monthly interest based on remaining principal
const monthlyInterest =
    (remainingAmount * interestPercent) / 100;

// snapshot total with interest
const totalWithInterest =
    totalAmount + monthlyInterest;

// ================= PAID BREAKDOWN =================
const totalPaid =
    paidPrincipal + paidInterest;

// ================= PRINCIPAL TRACKING =================
const principalPaid =
    totalAmount - remainingAmount;

// ================= PERCENTAGES =================
// const paidPercent =
// totalWithInterest
//     ? Math.round((totalPaid / totalWithInterest) * 100)
//     : 0;

// const remainingPercent =
// totalWithInterest
//     ? Math.round((remainingAmount / totalWithInterest) * 100)
//     : 0;

// ================= OPTIONAL DISPLAY VALUES =================
const display = {
    paidPrincipal,
    paidInterest,
    principalPaid,
    totalPaid,
    monthlyInterest,
};
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
        <header>
        <h1>Finance Management</h1>
    </header>
<div className="finance-dashboard">

  {/* ================= CUSTOMER HEADER ================= */}
  <div className="section">

    <div className="card">
      <h3>👤 Customer Name</h3>
      <h1>{customer.name}</h1>
    </div>

    <div className="card">
      <h3>📅 Joined Date</h3>
      <p>{new Date(customer.createdAt).toLocaleDateString()}</p>
    </div>

    <div className="card">
      <h3>🟢 Status</h3>
      <p>{remainingAmount > 0 ? "Active" : "Closed"}</p>
    </div>

  </div>


  {/* ================= LOAN OVERVIEW ================= */}
  <div className="section">

    <div className="card">
      <h3>💰 Principal Amount</h3>
      <h2>₹{totalAmount}</h2>
    </div>

    <div className="card">
      <h3>📉 Remaining Principal</h3>
      <h2>₹{remainingAmount}</h2>
    </div>

    <div className="card">
      <h3>📈 Interest Rate</h3>
      <h2>{interestPercent}%</h2>
    </div>

    <div className="card highlight">
      <h3>💵 Monthly Interest</h3>
      <h2>₹{monthlyInterest}</h2>
    </div>

  </div>


  {/* ================= PAYMENT SUMMARY ================= */}
  <div className="section">

    <div className="card">
      <h3>🔵 Paid Principal</h3>
      <h2>₹{principalPaid}</h2>
    </div>

    <div className="card">
      <h3>🟢 Paid Interest</h3>
      <h2>₹{paidInterest}</h2>
    </div>

    <div className="card">
      <h3>🟣 Total Paid</h3>
      <h2>₹{totalPaid}</h2>
    </div>

  </div>


  {/* ================= PROGRESS ================= */}
  

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
        <Addpayment payment={id} remaining={remainingAmount}></Addpayment>
        </>
    )
}