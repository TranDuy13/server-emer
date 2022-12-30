const Product = require("../models/Product");
const USER = require("../models/Admin");
const Status_Orders = require("../models/StatusOrders");
const Cart = require("../models/Cart");

const _ = require("lodash");
const buyProduct = async (body) => {
  try {
    const b = Object.values(_.groupBy(body.products, "seller.seller._id"));
    for (let index = 0; index < b.length; index++) {
      var c = 0;
      b[index].map((item) => (c += Number(item.seller.price * item.quantity)));
      const data = {
        customer: body.customer,
        products: b[index],
        address: body.address,
        total_amount: c,
        shop: b[index][0].seller.seller._id
      };
      const new_status_order = new Status_Orders(data);
      await new_status_order.save();

    }

    const a = [];
    body.products.map((item) => a.push(item.index));

    const product = Object.values(_.groupBy(body.products, "seller._id"));

    product.map((item) => {
      item[0].quantity = item[0].seller.quantity - item[0].quantity;
    });

    for (let index = 0; index < product.length; index++) {
      await Product.findByIdAndUpdate(
        { _id: product[index][0].product },
        { quantity: product[index][0].quantity }
      );
    }

    const update = await Cart.deleteMany({ createdAt: { $in: a } });

    return {
      message: "Buy product successfully!",
      data: "",
      success: true,
    };
  } catch (error) {
    return {
      message: "An error occurred!",
      success: false,
    };
  }
};
const getStatusByUser =async(id)=>{
  try {
    const find = await Status_Orders.find({customer:id})
    return {
      data: find,
      message: "Tìm kiếm thành công",
      success: true
    }
  } catch (error) {
    return {
 
      message: "Lỗi ",
      success: false
    }
  }
}
const getStatusBySeller =async(id)=>{
  try {
    const find = await Status_Orders.find({shop:id})
    return {
      data: find,
      message: "Tìm kiếm thành công",
      success: true
    }
  } catch (error) {
    return {
 
      message: "Lỗi ",
      success: false
    }
  }
}
const update_status_order = async (id, body) => {
  try {
    const status_order_customer = await Status_Orders.findOne({ id_order: id });
    if (!status_order_customer)
      return {
        message: "Can't get status of order!",
        success: false,
      };
  } catch (error) {
    return {
      message: "An error occured!",
    };
  }
};

module.exports = {
  buyProduct,
  getStatusByUser,
  getStatusBySeller
};
