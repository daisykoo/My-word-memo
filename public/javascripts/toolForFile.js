var fs = require('fs');
var path = require('path');

//遍历文件夹，返回文件夹中所有文件的路径
var readDir = function(dir, cb) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) {
			console.log(err);
			return cb(err);
		};
		var len = list.length;
		if (!len) {return cb(null, results)};
		list.forEach(function(file) {
			file = path.resolve(dir, file);
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					readDir(file, function(err, res) {
						results = results.concat(res);
						if (!(--len)) cb(null, results);
					});
				} else {
					results.push(file);
					if (!(--len)) cb(null, results);
				}
			});
		});
	});
};


var readFile = function(dir, cb) {
	var wordList = '';

	fs.open(dir, 'r', function opened(err, fd) {
		if (err) {throw err};

		var readBuffer = new Buffer(5120),
			bufferOffset = 0,
			bufferLength = readBuffer.length,
			filePosition = 0;
			
		fs.read(fd,
			readBuffer,
			bufferOffset,
			bufferLength,
			filePosition,
			function read(err, readBytes) {
				if (err) throw err;
				// console.log('just read' + readBytes + 'bytes' + '\n\n');
				wordList = readBuffer.slice(0, readBytes).toString();
				cb(dir, wordList);
			}
		);
	});
};

exports.readDir = readDir;
exports.readFile = readFile;


