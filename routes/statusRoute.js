const express = require("express");
const router = express.Router();
const Validator = require("../authenticator/index");
const Controller = require("../Controller/status.controller");


router.post("/purchase/buy",Controller.buyProduct)
router.post("/purchase/get",Controller.getStatusByUser)
router.post("/purchase/seller",Controller.getStatusBySeller)
module.exports=router;
