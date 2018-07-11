var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : String,
    content : String,
    category : Number,
    count : { type : Number, default : 0 },
    date : { type : String, default : '2018-07-10' },
    index : Number,
    password : String                               // for delete
});

module.exports = mongoose.model('board', schema);