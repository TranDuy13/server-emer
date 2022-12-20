const express = require("express");
const router = express.Router();
const Validator = require("../authenticator/index");
const Controller = require("../Controller/product.controller");
const authenticator = require("../authenticator/authenticator");
const jwtService = require("../services/jwt.service");


router.post("/create", Controller.createProduct);
router.get("/getbyseller", Controller.getProductBySeller);
router.post("/update/:id", Controller.updateProduct)
router.get("/:id", Controller.getProduct)
router.delete('/delete/:id', Controller.deleteProduct)



module.exports= router
