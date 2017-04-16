let express = require('express')
let appRouter = express()
let userApp = express()
let user = require('../service/user')

appRouter.post('/user/regist', admin.user)
appRouter.get('/user/delete', admin.removeUser)
appRouter.get('/user/forbidden', admin.forbidUser)

userApp.use('/user', appRouter)

module.exports = userApp
