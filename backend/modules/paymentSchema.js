const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  paidAmount: {
    type: Number,
    required: true,
  },

  Paidinterest: {
    type: Number,
    required: true,
  },

  remainingBalance: {
    type: Number,
    required: true,
  },

//   note: {
//     type: String,
//   },

  paidDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("paymentSchema", paymentSchema);