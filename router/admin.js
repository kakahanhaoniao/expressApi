let express = require('express')
let adminApp = express()
let appRouter = express()
let admin = require('../service/admin')

appRouter.post('/regist', admin.regist)
appRouter.post('/list', admin.getList)
appRouter.get('/delete', admin.removeUser)
appRouter.post('/login', admin.login)
appRouter.get('/logOut', admin.logOut)



adminApp.use('/admin', appRouter)

module.exports = adminApp
