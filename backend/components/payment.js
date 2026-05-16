const paymentschema = require("../modules/paymentschema");

const getpayment = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const payment = await paymentschema.find({customerId:id});
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


module.exports = {getpayment:getpayment};