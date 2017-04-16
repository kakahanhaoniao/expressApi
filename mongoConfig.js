var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/xiaoshaoTest')
mongoose.Promise = global.Promise
module.exports = mongoose
