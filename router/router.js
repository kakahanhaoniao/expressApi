const router = require('koa-router');
const indexRouter = new router();
let adminRouter = require('./admin')
// let userRouter = require('./user')
// let productRouter = require('./product')

indexRouter.use('/api', adminRouter.routes(), router().allowedMethods());
module.exports = indexRouter
