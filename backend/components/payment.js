const paymentSchema = require("../modules/paymentSchema");
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



const addpayment = async(req, res, next)=>{
    try{
        const payment = req.body;
                const addpayment = await paymentSchema.create(payment);
                res.status(200).json({
                    success:true,
                    message: "payment added successfully"
                })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}
module.exports = {getpayment:getpayment, addpayment:addpayment};