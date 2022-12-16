
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    customer:{
     
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Admin",
        required: true
    },
    Product: {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Product',
      required: true
    },
    quantity:{
        type: Number,
        required: true
    }
  },
  { timestamps: true },
);
Orders_Customer.pre(/^find/, function (next) {
    this.populate({
      path: "orders",
    });
    next();
  })
module.exports = mongoose.model('Cart', Orders_Customer);
