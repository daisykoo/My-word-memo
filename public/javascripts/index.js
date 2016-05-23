var inputName = $("#listName"),
	inputNumber = $("#listNumber");

var GetOriginalList = (function(){
	var GetQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
	var orName = GetQueryString('listName'),
		orNumber = GetQueryString('listNumber');
	if (orName && orNumber) {
		inputName.val(orName);
		inputNumber.val(orNumber);
	};
})();


$('#getWord').click(function() {
	var listName = inputName.val();
	var listNumber = parseInt(inputNumber.val());
	$.ajax({
		type : 'GET',
		url : 'http://localhost:3000/data',
		data : {
			'listName': listName,
			'listNumber': listNumber,
		},
		success: function(data) {
			console.log(data);
			getLex = getLexFn(data);

			(function init() {
				var lex = "";
				$("#next").click(function () {
					lex = getLex(1);
					showLex(lex);
					$("#cn").hide();
				});
				$("#prep").click(function() {
					lex = getLex(-1);
					showLex(lex);
					$("#cn").hide();
				});
				$("#mark").click(function () {
					addReview(lex);
				});
				$("#show").click(function () {
					$("#cn").show();
				})
				lex = getLex();
				showLex(lex);
				$("#cn").hide();
			})();
		}	
	});
})

var getLexFn = function (lexicals) {
	var arrLexs = _.shuffle(lexicals),
		len = arrLexs.length,
		i = 0;

	return function (a) {
		a = a || 0;
		i = i + a;
		if(i >= len){
			i = i - a;
			reviewList();
		}else if(i < 0){
			i = 0;
			alert("This is the first word.");
		}
		return arrLexs[i];
	}
};

var review = [];
var addReview = function(a) {
	review.push(a.en);
};



