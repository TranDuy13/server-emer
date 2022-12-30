const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status_Orders = new Schema({
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Admin",
    required: true
  },
  products: [
   {
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
   }
  ],
  address:{
    type: String,
    required: true
  },
  shop:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Admin",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "REFUND", "REJECTED", "COMPLETED"],
    default: "PENDING",

  },

  total_amount: {
    type: Number,
    required: true,
  },
},
{ timestamps: true },);
Status_Orders.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "-password",
  });
  next();
})
module.exports = mongoose.model('Status_Orders', Status_Orders);