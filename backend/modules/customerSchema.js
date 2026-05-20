const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  //   phone: {
  //     type: String,
  //     required: true,
  //   },
  totalAmount: {
    type: Number,
    required: true,
  },

  interestPercent: {
    type: Number,
    required: true,
  },

  remainingAmount: {
    type: Number,
  },
  paidinterest:{
    type:Number,
    default: 0,
  },
  intrestamount:{
    type:Number,
  },
  
  //   status: {
  //     type: String,
  //     default: "Pending",
  //   },

  createdAt: {
    type: Date,
    default:new Date()
  },

});

customerSchema.pre("save", function(next){
  //const intrestamount = ((this.totalAmount * this.interestPercent) / 100);
  if (this.isNew) {
    this.remainingAmount = this.totalAmount;
  }
})    


module.exports = mongoose.model("customerSchema", customerSchema);