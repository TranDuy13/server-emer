const Product = require("../models/Product");
const USER = require("../models/Admin");
const Status_Orders = require('../models/StatusOrders')
const Orders_Customer = require("../models/OrdersCustomer");

const buyProduct = async (id, body) => {
  try {
    const existProduct = await Product.findById({ _id: id });
    if (!existProduct)
      return {
        message: "Product is not exist!",
        success: false,
      };
    body["products"] = id;
    const new_status_order = new Status_Orders(body);
    await new_status_order.save();
    
    return {
      message: "Buy product successfully!",
      data: new_status_order,
      success: true,
    };
  } catch (error) {
    return {
      message: "An error occurred!",
      success: false,
    };
  }
};
const update_status_order= async(id, body)=>{
    try {
        const status_order_customer = await Status_Orders.findOne({id_order:id})
        if(!status_order_customer) return {
            message:"Can't get status of order!",
            success: false
        }
    } catch (error) {
        return {
            message:"An error occured!"
        }
    }
}
module.exports = {
  buyProduct,
};
