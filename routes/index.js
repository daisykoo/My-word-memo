var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Word = require('../models/vocabulary');
var dataInit = require('../public/javascripts/dataInit');


mongoose.connect('mongodb://localhost/words');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
});

/* GET home page. */
router.get('/', function(req, res, next) {
	//重置数据库
	dataInit();
	res.render('index', { 
		title: 'My-word-memo' ,
	});
	
});

/* GET input page. */
router.get('/input', function(req, res, next) {
  	res.render('input', { title: 'My-word-memo/input' });
});

/* 数据载入 */
router.post('/data', function(req, res, next) {
	var wordList = req.body.wordList;

  	for(var i = 0; i < wordList.length; i++) {
  		Word.addWord(wordList[i], function(result) {
  			console.log(result);
  		});
  	}
	res.send('success');
});

/* 数据输出 */
router.get('/data', function(req, res, next) {

	Word.findByList(req.query.listName, req.query.listNumber, function(results){
		res.send(results);	
	});

});

module.exports = router;
