const customerSchema = require("../modules/customerSchema");

const getallcustomer = async(req, res, next)=>{
    try{
        const customers = await customerSchema.find({});
        if(customers.length == 0){
         res.status(404).json({
            success:true,
            customer:customers
        })
    }else{
        res.status(200).json({
        success: true,
        customer: customers
        });
       
    }
    }catch(err){
        res.status(500).json({
            success:false,
        });
    }
}


const postcustomer = async(req, res, next)=>{
    try{
        const customer = req.body;
        const addcustomer = await customerSchema.create(customer);
        res.status(200).json({
            success:true,
            message: "customer added successfully"
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const deletecustomer =  async(req, res, next)=>{
    try{
        const id = req.params.id;
        const customer = await customerSchema.findByIdAndDelete({_id:id});
        if(!customer){
            res.status(404).json({
            success:false,
            message: "customer not found"
        })
        }else{
            res.status(200).json({
            success:true,
            message: "customer deleted successfully"
        })
        }

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

module.exports = {getallcustomer:getallcustomer, postcustomer:postcustomer, deletecustomer:deletecustomer};