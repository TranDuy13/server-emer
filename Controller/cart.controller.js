const cartService = require("../services/cart.service");
const controller = require("./controller");

const addtoCart = async (req, res) => {
  try {
    const cartS = await cartService.addtoCart(req.body);
    if (!cartS.success) return controller.sendError(res, cartS.message, 300);
    return controller.sendSuccess(res, cartS.data, 200, cartS.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
const deleteCart = async (req, res) => {
  try {
    const cartS = await cartService.deleteCart(req.params);
    if (!cartS.success) return controller.sendError(res, cartS.message, 300);
    return controller.sendSuccess(res, cartS.data, 200, cartS.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
const getCartbyUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const cartS = await cartService.getCartbyUser(req.params.id);
    if (!cartS.success) return controller.sendError(res, cartS.message, 300);
    return controller.sendSuccess(res, cartS.data, 200, cartS.message);
  } catch (error) {
    return controller.sendError(res);
  }
};

const updateCart = async (req, res) => {
  try {
    const cartS = await cartService.updateCart(req.params.id, req.body);
    if (!cartS.success) return controller.sendError(res, cartS.message, 300);
    return controller.sendSuccess(res, cartS.data, 200, cartS.message);
  } catch (error) {
    return controller.sendError(res);
  }
};

module.exports = Controller = {
  addtoCart,
  deleteCart,
  getCartbyUser,
  updateCart
};
