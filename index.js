const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const convert = require('koa-convert');
const bodyparser = require('koa-bodyparser');
const json = require('koa-json');
const path = require('path');
const static = require('koa-static');
const logger = require('./logger/config');
const accessLog = logger('access');
const appLog = logger('server');
const session = require('koa-session');
const errorMessge = require('./config/statusCode');
let indexRouter = require('./router/router');
const responseControl = require('./middlewares/response');
const error = require('koa-json-error');
const sessionConf = {
    key: 'xiaoshao',
    /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000,
    /** (number) maxAge in ms (default is 1 days) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true /** (boolean) signed or not (default true) */
}
app.keys = ['some secret hurr'];
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(static(path.join(__dirname, 'dist')));
app.use(convert(session(sessionConf, app)));
app.use(responseControl);


app.use(async function(ctx, next) {
    try {
        const start = new Date();
        let ms = 0;
        if (!ctx.req.url.match(/\/(login|regist)$/) && !ctx.session.userId) {
            ctx.error({
                statusCode: 2000403
            });
        } else {
            await next();
        }
        ms = new Date() - start;
        accessLog.info(`${ctx.method} ${ctx.protocol} ${ctx.ip} ${ctx.originalUrl} ${JSON.stringify(ctx.request.body)} ${ctx.headers['user-agent']}  ${ctx.status}   ${ms}ms`)
    } catch (err) {
        ctx.error({
            statusCode: err.status,
            message: err.message
        });
    }
});

// 监听错误返回状态
app.use(convert(error((err) => {
    return {
        status: err.status,
        message: err.message
    }
})));

app.use(indexRouter.routes());

app.listen(3000);

// 监听服务器错误
app.on('error', (error) => {
    if (process.env.NODE_ENV != 'test') {
        switch (error.code) {
            case 'EACCES':
                appLog.error(`port requires elevated privileges:${error.code}--${error.message}`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                appLog.error(`port is already in use: ${error.code}--${error.message}`);
                process.exit(1);
                break;
            default:
                appLog.error(`${error.message}--${error.stack}`);
                throw error;
        }
    }
});

// 全局错误捕获
process.on('uncaughtException', function(err){
    appLog.error(`got an error:${error.message}`);
    process.exit(1);
});
