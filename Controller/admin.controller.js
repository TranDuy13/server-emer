const adminService = require("../services/admin.services");
const controller = require("./controller");

const register = async (req, res) => {
  try {
    const resAuth = await adminService.register(req.value.body);
    if (!resAuth.success)
      return controller.sendError(res, resAuth.message, 300);
    return controller.sendSuccess(res, resAuth.data, 200, resAuth.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
const login = async (req, res) => {
  try {
    const resServices = await adminService.login(req.value.body);
    if (!resServices.success)
      return controller.sendError(res, resServices.message, 300);
    return controller.sendSuccess(res, resServices.data, 200, resServices.message);
  } catch (error) {
    return controller.sendError(res);
  }
};

const getAuth = async (req, res) => {
  try {
    const body = req.value.body;
    const _id = body.decodToken.data;
    const token = body.token;
    const CheckData = await adminService.getAuth({ _id, token });
    if (!CheckData) return controller.sendError(res, CheckData.message, 300);
    return controller.sendSuccess(res, CheckData.data, 200, CheckData.message);
  } catch (error) {
    return controller.sendError(res);
  }
};
const sendMail = async(req, res)=>{
  try {
    const resAuth = await adminService.sendMail(req.body)
    if(!resAuth.success) return  controller.sendError(res, resAuth.message,300)
    return controller.sendSuccess(res, resAuth.data, 200, resAuth.message)
  } catch (error) {
    return controller.sendError(res)
    
  }
}
const verifyUser = async(req, res)=>{
  try {
    const {token}=req.body
    const resAuth = await adminService.verifyUser(req.params.id, token)
    if(!resAuth.success) return  controller.sendError(res, resAuth.message,300)
    return controller.sendSuccess(res, resAuth.data, 200, resAuth.message)
  } catch (error) {
    return controller.sendError(res)
    
  }
}
module.exports = Controller = {
  register,
  login,
  getAuth,
  sendMail,
  verifyUser
};
