var express = require('express');
var router = express.Router();

var boardSchem = require('../db/models/board');

router.get('/list', function(req, res){
    boardSchem.find({},{_id : false, __v : false}, function(err, result){
        if(err){
            throw err;
        }
        res.render('board', { title: 'Ved\'s Blog.'});
    });
});

router.get('/item/:index', function(req, res){
    var index = req.param.index;

    // console logger
    console.log('/board/item : Request parameters ---' );
    console.log('[index] : ' + index);
    console.log('===================');
});

router.get('/delete/:index/:password', function(req, res){
    var index = req.param.index;
    var password = req.param.password;

    // console logger
    console.log('/board/delete : Request parameters ---');
    console.log('[index] : ' + index);
    console.log('[password] : ' + password);
    console.log('===================');
});

// Callback Hell
router.post('/create', function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var password = req.body.password;

    // console logger
    console.log('/board/create : Request parameters ---');
    console.log('[title] : ' + title);
    console.log('[content] : ' + content);
    console.log('[password] : ' + password);
    console.log('===================');

    var index = new Date().getTime();

    var newBoard = new boardSchem();
    newBoard.title = title;
    newBoard.content = content;
    newBoard.password = password;
    newBoard.index = index;
    newBoard.save(function(err, result){
        if(err){
            throw err;
        }
        console.log('/board/create : Save new document in Database ---');
        console.log('Save success.');
        console.log('===================');
        res.status(200);
        res.end();
    });
});

module.exports = router;