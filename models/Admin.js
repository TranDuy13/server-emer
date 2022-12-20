const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: ' ',
    },
    email: {
      type: String,
      lowercase: true,
      default:  ' ',
    },
    address: {
      type: String,
      default: ' ',
    },
    birthday:{
      default: new Date(),
      type: Date
    },
    avt:{
        url:{
          type: String,
        },
        public_id: {
          type: String,
        },
    },
    phone: {
      type: Number,
      default: ' ',
    },
    identity_card:{
      type: Number,
      default: ' ',
      unique: true
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", Admin);
