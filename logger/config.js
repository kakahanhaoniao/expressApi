const express = require('express');
const log4js = require('log4js');
const app = express();

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'dateFile',
            filename: 'logs/access.log',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'access'
         }
    ],
    replaceConsole: true
});

app.use(log4js.connectLogger(log4js.getLogger('debug'), {format:':method :url'}));

module.exports = (name) => {
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
};
