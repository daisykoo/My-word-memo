var mongoose = require('mongoose');

var VocabularySchema = new mongoose.Schema({
	listName: String,
	listNumber: Number,
	en: String,
	cn: String,
	progress: Number
})

//new collection
var Word = mongoose.model('Word',VocabularySchema);

//增删改查
Word.findByList = function(listName, listNumber, cb) {
	this.find({listName: listName, listNumber: listNumber},function(err, results) {
		if (err) {
			console.log(err);
		}
		cb(results);
	});
};

Word.addWord = function(word, cb) {
	var newWord = new Word();
	newWord.listName = word.listName;
	newWord.listNumber = word.listNumber;
	newWord.en = word.en;
	newWord.cn = word.cn;
	newWord.progress = word.progress;
	newWord.save(function(err, result) {
		if (err) {console.log(err)};
		cb(result);
	});
};

Word.updateWord = function(word, cb) {
	var condition = {en: word.en},
	update = {$set: {cn: word.cn, progress: word.progress}},
	option = {multi: true};
	this.update(condition, update, option, function(err, result) {
		if (err) {throw err};
		cb(result);
	});
}

Word.removeAll = function(cb) {
	this.remove({}, function(err) {
		if (err) {console.log(err);};
		console.log('removeAll');
		cb();
	})
}


module.exports = Word;