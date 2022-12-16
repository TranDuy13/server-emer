const express = require("express");
const router = express.Router();
const Validator = require("../authenticator/index");
const Controller = require("../Controller/status.controller");


router.post("/status/:id/haha/:body",Controller.buyProduct)

module.exports=router;
