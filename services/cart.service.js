const CART = require("../models/Cart");
const Product = require("../models/Product");

const addtoCart = async (body) => {
  try {
    const existCart = await CART.findOne({
      product: body.product,
      customer: body.customer,
    });
    if (existCart) {
      const update = await CART.findByIdAndUpdate(
        { _id: existCart._id },
        {
          quantity: existCart.quantity + body.quantity,
        }
      );

      const newCart = await CART.find({ customer: existCart.customer });

      return {
        data: newCart,
        message: "",
        success: true,
      };
    }
    const newCart = new CART(body);
    await newCart.save();
    const cartCustomer = await CART.find({ customer: body.customer });
    return {
      data: cartCustomer,
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "Lỗi server",
    };
  }
};
const updateCart = async (id,body) => {
  try {
    const existCart = await CART.findById({ _id: id });

    if (existCart) {
      const existProduct = await Product.findById({
        _id: existCart.product._id,
      });
      if (!existProduct) {
        return {
          data: "Sản phẩm không tồn tại!",
          message: "",
          success: false,
        };
      }
    }
    const update = await CART.findByIdAndUpdate(
      { _id: existCart._id },
      {
        quantity: body.quantity,
      }
    );
    const cartCustomer = await CART.find({ customer: existCart.customer });
    return {
      data: cartCustomer,
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: "Lỗi server",
    };
  }
};

const deleteCart = async (id) => {
  try {
    const existCart = await CART.findById({ _id: id });
    if (existCart) {
      const deleteCart = await CART.findByIdAndDelete({ _id: id });
      const cartSearch = await CART.find({ customer: existCart.customer });
      return {
        data: cartSearch,
        message: "",
        success: true,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi server",
    };
  }
};
const getCartbyUser = async (id) => {
  try {
    const existCart = await CART.find({ customer: id });
        
    if (!existCart) {
      return {
        data: "Sản phẩm không tồn tại!",
        message: "",
        success: false,
      };
    }
    return {
      data: existCart,
      message: "",
      success: true,
    };
  } catch (error) {
    return {
      message: "Lỗi",
      success: false,
    };
  }
};
module.exports = {
  addtoCart,
  deleteCart,
  getCartbyUser,
  updateCart,
};
