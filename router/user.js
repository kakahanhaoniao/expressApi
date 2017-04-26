const router = require('koa-router');
const  = new router({
    prefix: '/user'
});
let user = require('../service/user');

appRouter.post('/regist', admin.user);
appRouter.get('/delete', admin.removeUser);
appRouter.get('/forbidden', admin.forbidUser);


module.exports = userApp
