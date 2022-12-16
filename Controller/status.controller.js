const statusService = require("../services/status_order.services");
const controller = require("./controller");

const buyProduct = async (req, res) => {
  try {
    const statusSer = await statusService.buyProduct(req.params.id, req.body);
    if (!statusSer) return controller.sendError(res, statusSer.message, 300);
    return controller.sendSuccess(res, statusSer.data, 200, statusSer.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
module.exports = Controller = {
  buyProduct,
};
