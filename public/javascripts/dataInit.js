var toolForFile = require('./toolForFile');
var strToWords = require('./strToWords');
var Word = require('../../models/vocabulary');
var path = require('path');

//数据库重置函数
var dataInit = function() {
	//清除原来的数据
	Word.removeAll(function() {
		//获取list文件夹下所有文件
		toolForFile.readDir("./models/list", function(err, results) {
			if (err) console.log(err);
			//读取每个文件中的数据
			results.forEach(function(result) {
				//禁止对Mac OX系统自动生成的隐藏文件进行操作
				if (path.basename(result) !== ".DS_Store") {

					toolForFile.readFile(result, function(dir, wordStr) {
						
						var fileName = path.basename(dir);
						var dirName = path.dirname(dir).split('/');
						listName = dirName[dirName.length - 1];
						//将文件中的字符串数据转化为单词数组
						var words = strToWords(wordStr, fileName, listName);
						//将单词数组传入数据库，等待被调用。
						words.forEach(function(word) {
							Word.addWord(word, function(result) {

							});
						});
					});
				}; 
			});
				
		});

	});
}

module.exports = dataInit;