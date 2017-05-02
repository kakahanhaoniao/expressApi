const mongoose = require('mongoose');
const logger = require('./logger/config')('mongo');
let mongo = mongoose.connect('mongodb://localhost/xiaoshaoTest');
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  logger.error('Mongoose default connection open to ');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  logger.error('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    logger.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
