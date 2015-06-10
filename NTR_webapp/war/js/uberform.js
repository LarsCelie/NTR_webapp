/**
 * 
 */

// global counter
var counter = 1;

var questions = { "questions" : []};

function showSavedQuestions(){
	var div = document.getElementById('questionListSaved');
	div.innerHTML = "";
	for (var i = 0; i < questions["questions"].length; i++) {
		var panel = createQuestion(questions["questions"][i]);
		questions["questions"][i].index = i+1;
		panel.removeAttribute('class');
		panel.setAttribute('class','panel panel-success')
		panel.id = counter;
		div.appendChild(panel);
	}
}

function createDiv(className) {
	var div = document.createElement('div');
	div.setAttribute('class',className);
	return div;
}

function createTitle(data, className) {
	var h1 = document.createElement('h1');
	h1.setAttribute('class', 'panel-title');
	var index = (data == undefined) ? counter : data.index;
	h1.innerHTML = "Vraag " + index;
	return h1;
}


function createQuestion(data) {	
	//var panelClass = saved ? "panel panel-success" : "panel panel-primary"; 
	var panel = createDiv('panel panel-primary');
	panel.id = counter; 
	
	var inputType = createInputElement('text','hide');
	inputType.id = "vraag" + counter + "type";
	if (data == undefined) {
		inputType.value = document.getElementById('questionSelector').value;
	}
	panel.appendChild(inputType);
			
	var panelHeader = createDiv('panel-heading');
	var panelTitle = createTitle(data, 'panel-title');
	var type = (data == undefined) ? inputType.value : data.type; //data.type = input or form, it needs to be questionType
	
	panelHeader.appendChild(panelTitle);
	
	var questionType = createDiv('hide');
	questionType.innerHTML = document.getElementById('questionSelector').value;
	
	var panelBody = createDiv('panel-body');
	
	var input =	(type == 'multipleSelect' || type == 'multipleChoice')  ? createInput(data, false) : createInput(data, true);
	
	panelBody.appendChild(input);
	panel.appendChild(panelHeader);
	panel.appendChild(panelBody)
	
	return panel;
}

function addQuestion(){
	var div = createQuestion();
	var resultArea = document.getElementById('questionList');
	resultArea.innerHTML = "";
	resultArea.appendChild(div);
}

function createInputElement(type, className){
	var input = document.createElement('input');
	input.type = type;
	input.setAttribute('class', className);
	return input;
}

function createInput(data, isNormal) {
	
	var sVraag = 'vraag';
	var sType = 'type';
	var sValue = 'value';
	
	var div = createDiv('row');
	
	//attachment
	var labelAttachment = document.createElement('label');
	labelAttachment.setAttribute('class','control-label col-sm-1');
	labelAttachment.innerHTML = "Illustratie:";
	
	var inputAttachmentDiv = document.createElement('div');
	inputAttachmentDiv.setAttribute('class','col-sm-7');
	
	var inputAttachment = createInputElement('file','file');
	inputAttachment.accept = "file_extension|audio/*|video/*|image/*|media_type";
	//if (data !== undefined) inputAttachment.value = data.attachment.value;
	inputAttachmentDiv.appendChild(inputAttachment);
	//attachment
	
	//question
	var labelQuestion = document.createElement('label');
	labelQuestion.setAttribute('class','control-label col-sm-1');
	labelQuestion.innerHTML = "Vraag:";
	
	var inputDiv = createDiv('col-sm-5');
	
	var input = createInputElement('text','form-control');
	input.placeholder = "Vul hier de vraag in";
	if (data !== undefined) input.value = data.value;
	//question
	
	var buttonDiv = createDiv('col-sm-4');
	
	var buttonAdd = document.createElement('button');
	buttonAdd.setAttribute('class','btn btn-success col-sm-5');
	buttonAdd.type = "button";
	if (data !== undefined) {
		buttonAdd.onclick = changeQuestion;
		buttonAdd.innerHTML = "Sla wijziging op";
	} else {
		buttonAdd.onclick = saveQuestion;
		buttonAdd.innerHTML = "Sla vraag op";
	}
	
	var buttonDelete = document.createElement('button');
	buttonDelete.setAttribute('class','btn btn-danger col-sm-5 col-sm-offset-2');
	buttonDelete.type = "button";
	buttonDelete.innerHTML = "Verwijder vraag"
	buttonDelete.onclick = deleteQuestion;
	
	buttonDiv.appendChild(buttonAdd);
	buttonDiv.appendChild(buttonDelete);
	
	div.appendChild(labelAttachment);
	div.appendChild(inputAttachmentDiv);
	
	div.appendChild(buttonDiv);
	
	div.appendChild(labelQuestion);
	div.appendChild(inputDiv);
	inputDiv.appendChild(input);
	
	
	
	if (isNormal) {
		input.id = sVraag+counter+sValue;
		
		return div;
	} else {
		var form = document.createElement('form');
		form.id = sVraag+counter+sValue
		form.setAttribute('class','form-horizontal');
		form.action = "";
		
		form.appendChild(div);
		
		var optionDiv = document.createElement('div');
		form.appendChild(optionDiv);
		
		var button = document.createElement('button');
		button.type = "button";
		button.onclick = addOption;
		button.innerHTML = "Voeg optie toe";
		button.setAttribute('class','btn btn-success');
		
		form.appendChild(button);
		
		if (data !== undefined) {
			for (var i = 0; i < data.options.length; i++){
				addOption(button, data.options[i]);
			}
		}
		
		return form;
		
	}
	
}

function addOption(optionBtn, value) {
	
	var row = createDiv('row')
	
	var label = document.createElement('label');
	label.setAttribute('class', 'control-label col-sm-2');
	label.innerHTML = "Optie:";
	
	var inputDiv = createDiv('col-sm-3');
	
	var input = createInputElement('text','form-control');
	input.placeholder = "Vul hier je optie in";
	row.appendChild(document.createElement('br'));
	
	row.appendChild(label);
	row.appendChild(inputDiv);
	inputDiv.appendChild(input);
	
	var form;
	if (optionBtn.target == undefined) {
		form = optionBtn.parentNode; //form
		input.value = value;
	} else {
		form = optionBtn.target.parentNode;
	}
	
	form.children[1].appendChild(row);
}

function createSurvey() {
	$.ajax({
		url: "localhost:8080/NTR_application/Research/survey",
		type: "PUT",
		data: questions,
		dataType: "json",
		success: function(){
			alert("survey toegevoegd!");
		},
		failure: function(){
			alert("Er ging iets mis...");
		}
	});
}

function saveQuestion(){
	var vraagid = 'vraag' + counter + 'value';
	var element = document.getElementById(vraagid);
	var type = element.nodeName.toLowerCase();
	var obj = {};
	if (type === "input"){ //open, photo, image, audio questions
		
		obj["value"] = element.value;
	
	} else if (type == "form") { //multiple select/choice 
		var length = element.elements.length -1; //last element is add another option
		var arr = [];
		for (var x = 4; x < length; x++){  //start at 4th element to skip question and buttons
			var inputText = element.elements[x].value;
			arr.push(inputText);
		}
		obj["options"] = arr;
		obj["value"] = element.elements[3].value;
		
	}
	var id = "vraag" + counter + "type";
	obj["type"] = document.getElementById(id).value;
	obj["index"] = counter;
	
	questions["questions"][counter-1] = obj;
	showSavedQuestions();
	document.getElementById('questionList').innerHTML = "";
	counter++;
}

function deleteQuestion(element){
	var index = element.target.parentNode.parentNode.parentNode.parentNode.id - 1; //id of the div minus 1 for index for JSON obj
	questions["questions"].splice(index, 1);
	counter--;	
	showSavedQuestions();
}

function changeQuestion(element){
	//TODO: allow changing the element.
}