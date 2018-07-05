var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : String,
    content : String,
    count : { type : Number, default : 0 },
    date : { type : Date, default : Date.now },
    index : Number,
    password : String                               // for delete
});

module.exports = mongoose.model('board', schema);