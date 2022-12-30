const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    customer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Admin",
      required: true
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId, ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true },
);
Cart.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
})
Cart.pre(/^find/, function (next) {
  this.populate({
    path: "customer",
    select: "-password",
  });
  next();
})
module.exports = mongoose.model('Cart', Cart);