/**
 * 
 */

// global counter
var counter = 0;

function addQuestion(questionType) {
	
	counter++;
	var sVraag = 'vraag';
	var sType = 'type';
	var sValue = 'value';
	var div = document.getElementById('questionList');
	var output = '';
	
	output += '<h3 id="'+sVraag+counter+sType+'">'questionType'</h3>';
	output += '<hr class="half-rule">';
	
	if(questionType == 'multipleSelect' || questionType == 'multipleChoice') {
		
		output += '<form id="'+sVraag+counter+sValue+'" class="form-horizontal">';
		output += '<div class="row">';
		output += '<label class="control-label col-sm-2">Vraag:</label>';
		output += '<div class="col-sm-3">';
		output += '<input type="text" class="form-control" placeholder="Vul hier je vraag in">';
		output += '</div>';
		output += '</div>';
		
		output += '<button onclick="addOption(this)">Voeg optie toe</button>';
		output += '</form>';
		
	} else {
		
		output += '<div class="row">';
		output += '<label class="control-label col-sm-2">Vraag:</label>';
		output += '<div class="col-sm-3">';
		output += '<input type="text" id="'+sVraag+counter+sValue+'" class="form-control" placeholder="Vul hier je vraag in">';
		output += '</div>';
		output += '</div>';
		
	}
	
	div.innerHTML = output;
}

function addOption(optionBtn) {
	
	var x = optionBtn.parentNode; //form
	$(x).append('<div class="row">');
	$(x).append('<label class="control-label col-sm-2">Optie: </label>');
	$(x).append('<div class="col-sm-3">');
	$(x).append('<input type="text" class="form-control" placeholder="Vul hier je optie in">');
	
}