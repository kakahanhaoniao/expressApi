const md5 = require('md5');
const config = require('../config/secret');
const secretServ = config.secretServer;
const errorMessge = require('../config/statusCode');
module.exports = (ctx, next) => {
    const userId = ctx.session.userId;
    const user = ctx.session.user;
    if (userId && md5(`${secretServ}${username}`) == userId) {
        next();
    } else {
        ctx.body = {
            statusCode: 2000403,
            message: errorMessge['2000403']
        };
    }
}
