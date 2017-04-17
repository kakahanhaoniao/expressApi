let md5 = require('md5')
let config = require('../config/secret')
let secretServ = config.secretServer
module.exports = (req, res, next) => {
    let userId = req.session.userId
    let user =  req.session.user
    if ( userId && md5(`${secretServ}${username}`) == userId) {
        next()
    } else {
        res.send({
          statusCode: 2000403,
          message: errorMessge['2000403']
        })
    }
}
