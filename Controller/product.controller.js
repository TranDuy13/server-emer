const productService = require("../services/product.services");
const controller = require("./controller");

const createProduct = async (req, res) => {
  try {
    const proService = await productService.createProduct(req.body);
    if (!proService.success)
      return controller.sendError(res, proService.message, 300);
    return controller.sendSuccess(
      res,
      proService.data,
      200,
      proService.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const proService = await productService.getProduct(id);
    if (!proService.success)
      return controller.sendError(res, proService.message, 300);
    return controller.sendSuccess(
      res,
      proService.data,
      200,
      proService.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};
const getAllProduct = async (req, res) => {
  try {
    const productSer = await productService.getAllProduct();
    if (!productSer.success)
      return controller.sendError(res, productSer.message, 300);
    controller.sendSuccess(res, productSer.data, 200, productSer.message);
  } catch (error) {
    controller.sendError(res);
  }
};
const updateProduct = async (req, res) => {
  try {
    const productSer = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (!productSer.success)
      return controller.sendError(res, productSer.message, 300);
    return controller.sendSuccess(
      res,
      productSer.data,
      200,
      productSer.message
    );
  } catch (err) {
    return controller.sendError(res);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productSer = await productService.deleteProduct(req.params.id);
    if (!productSer.success)
      return controller.sendError(res, productSer.message, 300);
    return controller.sendSuccess(res, {}, 200, productSer.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
const getProductBySeller = async (req, res) => {
  try {
    const productSer = await productService.getProductBySeller(req.params.id);
    if (!productSer.success)
      return controller.sendError(res, productSer.message, 300);
    return controller.sendSuccess(
      res,
      productSer.data,
      200,
      productSer.message
    );
  } catch (error) {
    return controller.sendError(res);
  }
};
module.exports = Controller = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductBySeller,
};
