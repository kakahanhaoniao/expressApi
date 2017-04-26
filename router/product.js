const router = require('koa-router');
const appRouter = new router({
    prefix: '/product'
});
let product = require('../service/product');

appRouter.post('/add', admin.add);
appRouter.post('/update', admin.update);
appRouter.get('/delete', admin.delete);

module.exports = appRouter;
