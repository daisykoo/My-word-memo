var strToWords = function (str, list, listName) {
	var arr = str.split('\n');
	var result = _.map(arr, function (item, i) {
		var a = item.split(':');
		var en = a[0], cn = a[1];
		return {
			listName: listName,
			listNumber: list,
			en: en,
			cn: cn,
			progress:0,
		};
	});
	return result;
};

(function() {
	$('#submit').click(function(e){
		var inArea = $('#inArea').val(),
		 	listNumber = parseInt($('#listNumber').val()) || undefined,
		 	listName = $('#listName').val();
		if (inArea !== '') {
			if ((listName == '') || (listNumber == undefined)) {
				alert('请先输入词表名称和编号 ^0^');
			} else {
				var vocabulary = strToWords(inArea, listNumber, listName);
				console.log(vocabulary);
				$.ajax({
					type : 'POST',
					contentType: 'application/json', 
					url : 'http://localhost:3000/data',
					data : JSON.stringify({wordList: vocabulary}),
					
					success: function(data) {
						console.log(data);
						var change = confirm('词表保存成功！是否转到背诵页背诵？');
						if (change) {
							console.log(change)
							window.location.href='http://localhost:3000?listName=' + listName + '&listNumber=' + listNumber;
						};
					}	
				});
			}
			
		};
		
	});
		
})();