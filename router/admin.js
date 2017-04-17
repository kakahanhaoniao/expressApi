let express = require('express')
let adminApp = express()
let appRouter = express()
let admin = require('../service/admin')
let isAdmin = require('./isAdmin')

appRouter.post('/regist', admin.regist)
appRouter.post('/list', isAdmin, admin.getList)
appRouter.get('/delete', isAdmin, admin.removeUser)
appRouter.post('/login', admin.login)
appRouter.get('/logOut', admin.logOut)
appRouter.get('/checkLogin', isAdmin, admin.checkLogin)


adminApp.use('/admin', appRouter)

module.exports = adminApp
