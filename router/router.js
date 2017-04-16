let express = require('express')
let app = express()
let adminRouter = require('./admin')
// let userRouter = require('./user')
// let productRouter = require('./product')

exports.adminRouter = adminRouter

// exports = {
//   // userRouter,
//   // productRouter
// }
