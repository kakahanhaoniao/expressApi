const errorMessge = require('../config/statusCode');
module.exports = async (ctx, next) => {
    ctx.error = ({statusCode, message = errorMessge[statusCode]}) => {
        ctx.body = {
            statusCode,
            message
        }
    }
    ctx.success = ({statusCode, message = errorMessge[statusCode], data = {}}) => {
        ctx.body = {
            statusCode,
            message,
            data
        }
    }
    await next();
}
