const controller = require("./controller");
const AIservice= require('../services/ai.service')
const sendAImessage = async (req, res) => {
    try {
      const resAI =  AIservice.sendAImessage(req.body);
      console.log(resAI);
      if (!resAI.success)
        return controller.sendError(res,resAI.message,300);
      return controller.sendSuccess(res, resAI.data, 200, resAuth.message);
    } catch (error) {
      return controller.sendError(res);
    }
  };
  module.exports = Controller = {
   sendAImessage
  };