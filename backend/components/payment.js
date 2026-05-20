const paymentSchema = require("../modules/paymentSchema");
const customerSchema = require("../modules/customerSchema");
const mongoose = require("mongoose");

const getpayment = async(req, res, next)=>{
    try{
        const id = req.params.id.toString().trim();
        const payment = await paymentSchema.find({customerId:id});
        //const payment = await paymentschema.find({customerId: new mongoose.Types.ObjectId(id)});
        if(payment.length == 0){
            res.status(404).json({
            success:true,
            payment:payment
        })
        }else{
            res.status(200).json({
            success: true,
            payment:payment
            });
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}



const addpayment = async (req, res) => {

  try {

    const id = req.params.id;

    const paidPrincipal = Number(req.body.paidAmount) || 0;
    const paidInterest = Number(req.body.Paidinterest) || 0;

    const customer = await customerSchema.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    const newRemaining =
      customer.remainingAmount - paidPrincipal;

    if (newRemaining < 0) {
      return res.status(400).json({
        success: false,
        message: "Over payment not allowed"
      });
    }

    // SINGLE SOURCE UPDATE
    customer.remainingAmount = newRemaining;
    customer.paidAmount = (customer.paidAmount || 0) + paidPrincipal;
    customer.paidinterest = (customer.paidinterest || 0) + paidInterest;

    customer.intrestamount =
      newRemaining * (customer.interestPercent / 100);

    await customer.save();

    await paymentSchema.create({
      customerId: id,
      paidAmount: paidPrincipal,
      Paidinterest: paidInterest,
      remainingBalance: newRemaining,
      paidDate: new Date()
    });

    res.status(200).json({
      success: true,
      message: "Payment added successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const deletepayment = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const payment = await paymentSchema.findByIdAndDelete({_id:id})
        if(!payment){
            res.status(404).json({
                success:false,
                message:"payment not found"
            })        }else{
                res.status(200).json({
                    success:true,
                    message:"payment deleted successfully"
                })
            }
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }

    const updatepayment=async(req,res)=>{
        console.log("update payment successfully"); 
    try{
        const id=req.params.id;
        const updatepayment=req.body;
        const payment=await paymentSchema.findByIdAndUpdate({_id:id},{$set:updatepayment},{new:true})
        if(!payment){
            res.status(404).json({
                success:false,
                message:"payment not found"
            })
        }else{
            res.status(200).json({
                success:true,
                message:"payment updated successfully"
            })
        }
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }

module.exports = {getpayment:getpayment, addpayment:addpayment,deletepayment:deletepayment,updatepayment:updatepayment};