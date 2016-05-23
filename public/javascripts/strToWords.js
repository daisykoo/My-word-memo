var strToWords = function (str, list, listName) {
	var strArr = str.split('\n');
	// console.log(arr);
	var result = [];
	strArr.forEach(function(str) {
		if (str !== '') {
			var a = str.split(':');
			var en = a[0], cn = a[1];

			var word = {
				listName: listName,
				listNumber: list,
				en: en,
				cn: cn,
				progress:0,
			};

			result.push(word);
		};
	})
	return(result);	
}
	

module.exports = strToWords;
