const koa = require('koa');
const log4js = require('koa-log4');
const app = new koa();

log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'DateFile',
        filename: 'logs/access.log',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        category: 'access'
    }, {
        type: 'file',
        filename: 'logs/server.log',
        backups: 3,
        category: 'server'
    },{
        type: 'file',
        filename: 'logs/debug.log',
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true,
        category: 'debug'
    },{
        type: 'file',
        filename: 'logs/mongo.log',
        backups: 3,
        category: 'mongo'
    }],
    replaceConsole: true
});

app.use(log4js.koaLogger(log4js.getLogger('debug'), {
    format: ':method :url'
}));

module.exports = (name, level = 'INFO') => {
    var logger = log4js.getLogger(name);
    logger.setLevel(level);
    return logger;
};
