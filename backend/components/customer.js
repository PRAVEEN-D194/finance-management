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
        addcustomer.intrestamount = addcustomer.remainingAmount*(addcustomer.interestPercent/100);
        await addcustomer.save();
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

    try{

        const id = req.params.id;
        const setcustomer = req.body;

        // old customer
        const customer = await customerSchema.findById(id);

        if(!customer){
            return res.status(404).json({
                success:false,
                message:"customer not found"
            });
        }

        // updated interest
        const interest =
            Number(setcustomer.interestPercent);

        // calculate interest amount
        const interestAmount =
            (customer.totalAmount * interest) / 100;

        // total with interest
        const totalWithInterest =
            customer.totalAmount + interestAmount;

        // total already paid
        const totalPaid =
            customer.totalpaid || 0;

        // new remaining amount
        setcustomer.remainingAmount =
            totalWithInterest - totalPaid;

        // update customer
        const updatedCustomer =
            await customerSchema.findByIdAndUpdate(
                id,
                { $set: setcustomer },
                { new:true }
            );

        res.status(200).json({
            success:true,
            message:"customer updated successfully",
            customer: updatedCustomer
        });

    }catch(err){
        console.log(err);
    }

}

module.exports = {getallcustomer:getallcustomer,getsinglecustomer:getsinglecustomer, postcustomer:postcustomer, deletecustomer:deletecustomer, updatecustomer:updatecustomer};