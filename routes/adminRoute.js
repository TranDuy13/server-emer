const express = require("express");
const { scanLocalNetwork } =require( 'local-network-scan')
const router = express.Router();

const Validator = require("../authenticator/index");
const Controller = require("../Controller/admin.controller");
const authenticator = require("../authenticator/authenticator");
const jwtService = require("../services/jwt.service");

router.get("/getAuth", jwtService.verify, Controller.getAuth);
router.post(
  "/register",
  Validator.body(authenticator.register),
  Controller.register
);

router.post("/login", Validator.body(authenticator.login), Controller.login);
router.post("/verify/seller", Controller.sendMail);
router.post("/verify/seller/:id", Controller.verifyUser);
// router.post("/verify", (request, response, next) => {
//   var secret = Speakeasy.generateSecret({ length: 20 });
//   return response.status(200).json({
//     data: secret.base32,
//     success: true
//   })
// });
router.post("/message",
async (req,res) => {

	// Scan default network, with default option
	const res1 = await scanLocalNetwork();
	console.log(res1); // [{ ip: '192.168.1.1', mac: '11aa22bb33cc' }, { ip: '192.168.1.2', mac: '12ab23bc34cd' }]

	// Scan specific network
	const res2 = await scanLocalNetwork({ localNetwork: '192.168.2' });
	console.log(res2); // [{ ip: '192.168.2.1', mac: '11aa22bb33cc' }, { ip: '192.168.2.2', mac: '12ab23bc34cd' }]

	// Query device vendor (using https://macvendors.com/ API) - OFF by default
	const res3 = await scanLocalNetwork({ queryVendor: true });
	console.log(res3); // [{ ip: '192.168.2.1', mac: '11aa22bb33cc', vendor: 'some vendor' }, { ip: '192.168.2.2', mac: '12ab23bc34cd', vendor: ''  }]

// (req, res)=>{
  

//   const nets = networkInterfaces();
//   const results = Object.create(null); // Or just '{}', an empty object
  
//   for (const name of Object.keys(nets)) {
//       for (const net of nets[name]) {
//           // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//           // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
//           const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
//           if (net.family === familyV4Value && !net.internal) {
//               if (!results[name]) {
//                   results[name] = [];
//               }
//               results[name].push(net.address);
//           }
//       }
//   }
  return res.json({
    data: res2
  }).status(200)
})

module.exports = router;
