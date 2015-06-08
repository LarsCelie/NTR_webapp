/**
 * 
 */

// global counter
var counter = 0;

function addQuestion() {
	
	counter++;
	var sVraag = 'vraag';
	var sType = 'type';
	var sValue = 'value';
	var div = document.getElementById('questionList');
	var questionType = document.getElementById('questionSelector').value;
	var output = '';
	
	output += '<h4 id="' + sVraag + counter+ sType+ '">'+counter+ ': ' +questionType+'</h4>';
	
	if(questionType == 'multipleSelect' || questionType == 'multipleChoice') {
		
		output += '<form id="'+sVraag+counter+sValue+'" class="form-horizontal">';
		output += '<div class="row">';
		output += '<label class="control-label col-sm-1">Vraag:</label>';
		output += '<div class="col-sm-5">';
		output += '<input type="text" class="form-control" placeholder="Vul hier je vraag in">';
		output += '</div>';
		output += '</div>';
		
		output += '<button onclick="addOption(this)">Voeg optie toe</button>';
		output += '</form>';
		
	} else {
		
		output += '<div class="row">';
		output += '<label class="control-label col-sm-1">Vraag:</label>';
		output += '<div class="col-sm-5">';
		output += '<input type="text" id="'+sVraag+counter+sValue+'" class="form-control" placeholder="Vul hier je vraag in">';
		output += '</div>';
		output += '</div>';
		
	}
	output += '<hr class="half-rule">';
	
	div.innerHTML += output;
}

function addOption(optionBtn) {
	
	var x = optionBtn.parentNode; //form
	$(x).append('<div class="row">');
	$(x).append('<label class="control-label col-sm-2">Optie: </label>');
	$(x).append('<div class="col-sm-3">');
	$(x).append('<input type="text" class="form-control" placeholder="Vul hier je optie in">');
	
}

function createSurvey() {
	var json = {
		'questions' : []
	};

	for (var i = 1; i < counter; i++){
		var vraag = 'vraag' + i; //question
		var id = vraag + 'value'; //input element id
		var element = document.getElementById(id); //get the element
		var type = element.nodeName.toLowerCase();  //get type in lower case
		var obj = {};
		if (type === "input"){ //open, photo, image, audio questions
			obj["value"] = element.value;
			obj["type"] = 
			json.questions[(i-1)] = element.value; //value of the question input
			
			
		} else if (type == "form") { //multiple select/choice
			var length = element.elements.length;
			var arr = [];
			for (var x = 1; x < length; x++){
				var inputText = element.elements[x].value;
				arr.push(inputText);
			}
			obj["options"] = arr;
		}
	}

}