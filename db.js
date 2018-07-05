var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/private_blog');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
 // connect to MongoDB server.
 console.log('Connected to MongoDB server');
});

module.exports = db;

