const mongoose = require("mongoose");
const customerSchema = require('./customerSchema');

const paymentSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  paidAmount: {
    type: Number,
    default: 0
  },

  Paidinterest: {
    type: Number,
    default: 0
  },

  remainingBalance: {
    type: Number,
  },

  //   note: {
  //     type: String,
  //   },

  paidDate: {
    type: Date,
    default: Date.now,
  },

});

// paymentSchema.pre("save", async function (next) {
//   try {
//     const customer = await customerSchema.findById(this.customerId);
//     this.remainingBalance = customer.totalAmount -  this.paidAmount;
//     const interest = customer.paidinterest + this.Paidinterest;
//     const paidprinciple = customer.paidAmount + this.paidAmount;
//     const interestamount = this.remainingBalance * (customer.interestPercent / 100);
//     await customerSchema.findByIdAndUpdate(this.customerId, { $set: {
//       remainingAmount: this.remainingBalance, 
//       paidinterest: interest,
//       intrestamount:interestamount,
      
//        } })
//   } catch (err) {
//     message: err.message
//   }
// })

module.exports = mongoose.model("paymentSchema", paymentSchema);