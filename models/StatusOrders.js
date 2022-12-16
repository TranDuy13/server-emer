const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Status_Orders = new Schema({
  products: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "REFUND", "REJECTED", "COMPLETED"],
    default: "PENDING",
    require: true,
  },
  time_order: {
    type: Date,
    required: true,
  },
  time_status: {
    type: Date,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  detail:{
    type: String,
    // required: true
  }
});
module.exports = mongoose.model('Status_Orders', Status_Orders);