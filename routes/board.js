var express = require('express');
var router = express.Router();
var showdown = require('showdown');
var showdownHighlight = require('showdown-highlight');
var converter = new showdown.Converter({
    extensions: [showdownHighlight],
    ghCodeBlocks: true
});

var boardSchem = require('../db/models/board');

function categorizer(result, obj){
    if(result.category == 0){
        obj.categoryStr = 'Algorithm';
    }else{
        obj.categoryStr = 'etc.';
    }
}

router.get('/list', function(req, res){
    boardSchem.find({},{_id : false, __v : false}, function(err, result){
        if(err){
            throw err;
        }
        var arr = [];
        for(var i = 0; i < result.length; i++){
            var obj = {};
            categorizer(result[i], obj);
            obj.title = result[i].title;
            obj.date = result[i].date;
            obj.index = result[i].index;
            console.log(obj);
            arr.push(obj);
        }
        res.render('board', { title: 'Ved\'s Blog.', result : arr});
    });
});

router.get('/item/:index', function(req, res){
    var index = req.params.index;

    // console logger
    console.log('/board/item : Request parameters ---' );
    console.log('[index] : ' + index);
    console.log('===================');
    boardSchem.findOne({index : index}, function(err, result){
        if(err){
            throw err;
        }
        var obj = new Object();
        var mdText = result.content;
        obj.content = converter.makeHtml(mdText);
        obj.index = result.index;
        obj.date = result.date;
        obj.title = result.title;
        categorizer(result, obj);
        console.log(obj);
        res.render('boardItem', {title: 'Ved\'s Blog.', boardItem : obj});
    });
});

router.get('/delete/:index/:password', function(req, res){
    var index = req.params.index;
    var password = req.params.password;

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
    var category = req.body.category;

    // console logger
    console.log('/board/create : Request parameters ---');
    console.log('[title] : ' + title);
    console.log('[content] : ' + content);
    console.log('[password] : ' + password);
    console.log('===================');

    var date = new Date();

    boardSchem.find({}, function(err, result){
        if(err){
            throw err;
        }
        var newBoard = new boardSchem();
        newBoard.title = title;
        newBoard.content = content;
        newBoard.password = password;
        newBoard.index = result.length + 1;
        newBoard.category = category;
        newBoard.date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
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
});

module.exports = router;