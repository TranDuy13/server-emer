const express = require("express");
const router = express.Router();
const Validator = require("../authenticator/index");
const Controller = require("../Controller/product.controller");
const authenticator = require("../authenticator/authenticator");
const jwtService = require("../services/jwt.service");


router.post("/create", Controller.createProduct);
router.post("/getbyseller", Controller.getProductBySeller);
router.post("/update/:id", Controller.updateProduct)
router.get("/item/:id", Controller.getProduct)
router.delete('/delete/:id', Controller.deleteProduct)
router.get("/get/allProduct", Controller.getAllProduct)
router.post("/get/type",Controller.getTypeProduct)


module.exports= router
