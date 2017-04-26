const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const path = require('path');
const static = require('koa-static');
const logger = require('./logger/config')('access');
const session = require('koa-session');
const errorMessge = require('./config/statusCode');
let indexRouter = require('./router/router');
const sessionConf = {
    key: 'xiaoshao',/** (string) cookie key (default is koa:sess) */
    maxAge: 86400000,/** (number) maxAge in ms (default is 1 days) */
    overwrite: true,/** (boolean) can overwrite or not (default true) */
    httpOnly: true,/** (boolean) httpOnly or not (default true) */
    signed: true/** (boolean) signed or not (default true) */
}
app.keys = ['some secret hurr'];
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(static(path.join(__dirname, 'dist')));
app.use(convert(session(sessionConf, app)));

app.use(async function (ctx, next) {
    debugger;
    const start = new Date();
    let ms = 0;
    if (!ctx.req.url.match(/\/(login|regist)$/) && !ctx.session.userId) {
        ctx.body = {
            statusCode: 2000403,
            message: errorMessge['2000403']
        }
    } else {
        await next();
    }
    ms = new Date() - start;
    logger.info(`${ctx.method} ${ctx.protocol} ${ctx.ip} ${ctx.originalUrl} ${JSON.stringify(ctx.request.body)} ${ctx.headers['user-agent']}  ${ctx.status}   ${ms}ms`)
    if (ctx.status === 404) {
        const err = new Error('Not Found');
        ctx.body = {
            status: err.status,
            message: err.message
        }
    }
});

app.use(indexRouter.routes());

app.listen(3000);
