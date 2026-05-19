const customerSchema = require("../modules/customerSchema");

const getsinglecustomer = async(req, res, next)=>{
    try{
        const id = req.params.id;
        const customer = await customerSchema.findById({_id:id});
        if(!customer){
            res.status(404).json({
            success:false,
            customer:customer
        })
        }else{
            res.status(200).json({
            success:true,
            customer:customer
        })
        }

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const getallcustomer = async(req, res, next)=>{
    try{
        const customers = await customerSchema.find({});
        if(customers.length == 0){
         res.json({
            success:true,
            customer:customers
        })
    }else{
        res.status(200).json({
        success: true,
        customer:customers
        });
       
    }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


const postcustomer = async(req, res, next)=>{
    try{
        const customer = req.body;
        const addcustomer = await customerSchema.create(customer);
        res.status(200).json({
            success:true,
            customer:customer
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

const updatecustomer = async(req, res, next) =>{
    console.log("yes")
    try{
        const id = req.params.id;
        const setcustomer = req.body;
        const customer = await customerSchema.findByIdAndUpdate({_id:id}, {$set: setcustomer}, {new:true});
        
        if(!customer){
            res.status(404).json({
            success:false,
            message: "customer not found"
        })
        }else{
            res.status(200).json({
            success:true,
            message: "customer updated successfully"
        })
    }

    }catch(err){
        console.log(err);
    }
}

module.exports = {getallcustomer:getallcustomer,getsinglecustomer:getsinglecustomer, postcustomer:postcustomer, deletecustomer:deletecustomer, updatecustomer:updatecustomer};