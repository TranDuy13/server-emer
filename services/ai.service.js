const { spawn } = require("child_process");
const sendAImessage =  (body) => {
    try {
         const AI = spawn("python3", ["./chat.py", body]);
             AI.stdout.on("data", function (data) {
             return {
                data: data,
                message:'outgoing',
                success: true
             }
            });
          } catch (error) {
            return {
                data: "Bot đang quá tải, vui lòng thử lại sau",
                message:'outgoing',
                success: false
             }
          }
};
module.exports = {
  sendAImessage,
};
