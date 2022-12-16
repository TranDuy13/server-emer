
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orders_Customer = new Schema(
  {
    customer:{
     
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Admin",
        required: true
    },
    orders: [{
      type: mongoose.SchemaTypes.ObjectId, ref: 'Status_Orders',
      required: true
    },]
  },
  { timestamps: true },
);
Orders_Customer.pre(/^find/, function (next) {
    this.populate({
      path: "orders",
    });
    next();
  })
module.exports = mongoose.model('Orders_Customer', Orders_Customer);
