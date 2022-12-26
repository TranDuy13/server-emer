const express = require("express");
const router = express.Router();
const Controller = require("../Controller/ai.controller");
const { spawn, exec } = require("child_process");
router.post("/question", (req, res) => {
  try {
    
    const AI = spawn("python", ["chat.py", req.body.text]);
    exec(`python chat.py ${req.body.text}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    AI.stdout.on("data", function (data) {
      res
        .json([
            { data: req.body.text, direction: "outgoing" },
          { data: data.toString(), direction: "incoming"}
         ]
        )
        .status(200);
    });
  } catch (error) {
    res
      .status(500)
      .json({
        data: "Hiện BOT đang bận, bạn vui lòng đợi trong giây lát và gửi lại tin nhắn",
        success: false,
      })
      .status(500);
  }
});
// router.post("/question",Controller.sendAImessage)
module.exports = router;
