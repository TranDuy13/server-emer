const express = require('express')

const adminRoute= require('./adminRoute')
const statusRoute = require('./statusRoute')
const productRoute = require('./productRoute')
const aiRoute =require('./aiRoute')


const Route = express.Router()

Route.use('/auth', adminRoute);

Route.use('/product', productRoute)

Route.use('/customer',statusRoute )

Route.use('/ai',aiRoute)

// Route.use('/admin', adminRoute);

module.exports= Route;