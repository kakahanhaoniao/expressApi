const koa = require('koa');
const log4js = require('koa-log4');
const app = new koa();

log4js.configure({
    appenders: [
        {
            type: 'console'
        },
        {
            type: 'DateFile',
            filename: 'logs/access.log',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'access'
        }
    ],
    replaceConsole: true
});

app.use(log4js.koaLogger(log4js.getLogger('debug'), {
    format: ':method :url'
}));

module.exports = (name) => {
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};
