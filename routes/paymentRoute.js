const express = require("express");
const router = express.Router();

const Controller = require("../Controller/payment.controller");
router.post("/payWithMomo",Controller.payment)

module.exports = router