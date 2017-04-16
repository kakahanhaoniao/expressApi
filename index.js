let express = require('express');
let app = express()
let md5 = require('md5')
let compression = require('compression')
let path = require('path')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let session = require('express-session')
let port = 3000
const errorMessge =  require('./config/statusCode')
require('./model/rootAdmin')
require('./model/product')
require('./model/user')
let {adminRouter, userRouter, productRouter} = require('./router/router')

app.use(compression())
app.use(logger('dev'))
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


app.all('*', (req, res, next) => {
  debugger
  if (!req.url.match(/\/login$/) && !req.session.userId) {
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


app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
