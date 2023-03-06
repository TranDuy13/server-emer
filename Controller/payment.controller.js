const MoMo = require("../services/MoMo.service");
const controller = require("./controller");

const payment = async (req, res) => {
  try {
    const statusSer = await MoMo.apiMomo(req.body.total, req.body.message);
    if (!statusSer.success) return controller.sendError(res, statusSer.message, 300);
    return controller.sendSuccess(res, statusSer.data, 200, statusSer.message);
  } catch (error) {
    return controller.sendError(res);
  }
};


module.exports = Controller = {
  payment,

};
