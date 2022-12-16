const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    seller:{
        type: mongoose.SchemaTypes.ObjectId, ref: 'Admin',
        required: true
    },
    name_product: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    type: [{
      types:{
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    }],
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },

);
Product.pre(/^find/, function (next) {
    this.populate({
        path: 'seller',
        select: '-password',
    });
    next();
});
module.exports = mongoose.model('Product', Product)
