let express = require('express');
let app = express()
let md5 = require('md5')
let compression = require('compression')
let path = require('path')
// let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let port = 3000
const errorMessge =  require('./config/statusCode')
let logger = require('./logger/config')('access')
require('./model/rootAdmin')
require('./model/product')
require('./model/user')
let {adminRouter, userRouter, productRouter} = require('./router/router')
var responseTime = require('response-time')
var StatsD = require('node-statsd')
var stats = new StatsD()

stats.socket.on('error', function (error) {
  console.error(error.stack)
})


app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'xiaoshao',
  resave: false,
  key: 'userId',
  saveUninitialized: true,
  cookie: { secure: false, expires:1000*60*60*24 }
}))

app.use(responseTime(function (req, res, time) {
  logger.info(`${req.method} ${req.protocol} ${req.ip} ${req.originalUrl} ${JSON.stringify(req.body)} ${req.headers['user-agent']}  ${res.statusCode}   ${time}ms`)
}))

// TODO
app.all('*', (req, res, next) => {
    res.set('connection', 'keep-alive');
    console.log(req);
    req.on('data', (chunk) => {
        console.log(chunk);
    })
    if (!req.url.match(/\/(login|regist)$/) && !req.session.userId) {
        res.json({
            statusCode: 2000403,
            message: errorMessge['2000403']
        })
    } else {
        next()
    }
    console.log('拦截器一枚')
})


app.use('/api',adminRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    debugger
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
