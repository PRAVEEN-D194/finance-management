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

    const amount = customer.reduce((total, c)=>{
        return total+c.totalAmount;
    }, 0)

    // const getAmount = customer.reduce((total, c)=>{
    //     return total + c.totalAmount + ((c.totalAmount * c.interestPercent) / 100)- c.remainingAmount;
    // }, 0)

    // const getAmount = customer.reduce((total, c) => {
    // const interest = (c.totalAmount * c.interestPercent) / 100;
    // const received = (c.totalAmount + interest) - c.remainingAmount;

    // return total + received;
    // }, 0)

    const getAmount = customer.reduce((total, c) => {

    const paidPrincipal =
        (c.totalAmount || 0) -
        (c.remainingAmount || 0);

    const paidInterest =
        c.paidinterest || 0;

    return total + paidPrincipal + paidInterest;

}, 0);

    const ExpectedInterest = customer.reduce((total, c)=>{
        return total + ((c.totalAmount * c.interestPercent)/100);
    }, 0)
    const count = customer.length;
    const getprofitorloss = ()=>{
    const TotalProfit = getAmount - amount;

    if (TotalProfit < 0) {

        return `LOSS : Rs.${Math.abs(TotalProfit)}`;

    }
    else if (TotalProfit === 0) {

        return `NO LOSS NO PROFIT : Rs.0`;

    }
    else {

        return `PROFIT : Rs.${TotalProfit}`;

    }
    }
    
    return ( <>
    <header>
        <h1>Finance Management</h1>
    </header>
    <div className="dashboard">

        <div className="dash-card">
            <h3>Total Amount</h3>
            <p>₹{amount}</p>
        </div>

        <div className="dash-card">
            <h3>Get Amount</h3>
            <p>₹{getAmount}</p>
        </div>

        {/* <div className="dash-card">
            <h3>Expected Interest</h3>
            <p>₹{ExpectedInterest}</p>
        </div> */}

        <div className="dash-card">
            <h3>Profit / Loss</h3>
            <p>{getprofitorloss()}</p>
        </div>

        <div className="dash-card">
            <h3>Customers</h3>
            <p>{count}</p>
        </div>

    </div>
    <Addcustomer/>
    
    <div id="customercontainer">
        <div className="customer-card">
        <div className="field"><strong>Name</strong></div>
        <div className="field"><strong>Total</strong></div>
        <div className="field"><strong>Interest</strong></div>
        <div className="field"><strong>paidAmount</strong></div>
        <div className="field"><strong>Remaining</strong></div>
        <div className="field"><strong>Date</strong></div>
        <div className="field">
          <strong>delete or View</strong>
        </div>
            </div>
          {customer.map((c, index) => (
            <Customer key={index} customer={c} setcustomer={setcustomer} />
          ))}
        </div>
  </>)
}