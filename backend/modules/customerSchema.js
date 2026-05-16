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
  this.remainingAmount = this.totalAmount + ((this.totalAmount * this.interestPercent) / 100);
})    

module.exports = mongoose.model("customerSchema", customerSchema);