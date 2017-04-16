let express = require('express')
let appRouter = express()
let productApp = express()
let product = require('../service/product')

appRouter.post('/add', admin.add)
appRouter.post('/update', admin.update)
appRouter.get('/delete', admin.delete)

productApp.use('/product', appRouter)

module.exports = productApp
