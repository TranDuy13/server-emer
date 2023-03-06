const express = require('express')

const adminRoute= require('./adminRoute')
const statusRoute = require('./statusRoute')
const productRoute = require('./productRoute')
const aiRoute =require('./aiRoute')

const cartRoute =require('./cartRoute')
const paymentRoute = require('./paymentRoute')
const Route = express.Router()

Route.use('/auth', adminRoute);

Route.use('/product', productRoute)

Route.use('/customer',statusRoute )

Route.use('/ai',aiRoute)

Route.use('/cart', cartRoute);
Route.use('/pay', paymentRoute);


module.exports= Route;