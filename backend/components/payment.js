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



const addpayment = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const customer = await customerSchema.findById({_id:id});
        const remainingAmount = Number(customer.remainingAmount);
        const pintrest = Number(req.body.Paidinterest ?? 0 );
        const pamount = Number(req.body.paidAmount ?? 0);
        if(remainingAmount>0 && remainingAmount - pintrest - pamount >= 0){
                const payment = req.body;
                const addpayment = await paymentSchema.create(payment);
                res.status(200).json({
                    success:true,
                    message: "payment added successfully"
                })
        }
        else{
            res.status(200).json({
                    success:false,
                    message: "you paid all amount or you amount more then you geted amount plece check"
                })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

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
module.exports = {getpayment:getpayment, addpayment:addpayment,deletepayment:deletepayment};