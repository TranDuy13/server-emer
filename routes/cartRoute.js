const express = require("express");
const router = express.Router();

const Controller = require("../Controller/cart.controller");
router.post("/add",Controller.addtoCart)
router.get("/get/cart/user/:id",Controller.getCartbyUser)
router.delete('/delete/:id', Controller.deleteCart)
router.post('/update/cart/:id', Controller.updateCart)

module.exports = router