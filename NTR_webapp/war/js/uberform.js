window.onload = setResearchId;

counter = 1;

function setResearchId(){
	var researchString = localStorage.getItem("research");
	var research = JSON.parse(researchString);
	var id = (research == null) ? 1 : research.id;
	var element = document.getElementById("researchid");
	element.value = id;
}

function createTypeSelector(){
	var select = createElement('select','form-control dropdown');
	select.onchange = updateQuestionType;
	var optionImage = createOption('image', "Foto's");
	var optionVideo = createOption('video', "Video's");
	var optionAudio = createOption('audio', "Audio");
	var optionOpen = createOption('open', "Open");
	var optionChoice = createOption('multipleChoice', "Meerkeuze (1 antwoord)");
	var optionSelect = createOption('multipleSelect', "Meerkeuze");
	select.appendChild(optionImage);
	select.appendChild(optionVideo);
	select.appendChild(optionAudio);
	select.appendChild(optionOpen);
	select.appendChild(optionChoice);
	select.appendChild(optionSelect);
	return select;
}

function createQuestionPanel(){
	var panel = createElement('div','panel panel-info');
	
	var panelHeading = createElement('div','panel-heading');
	var panelTitle = createElement('h1','panel-title');
	
	panelHeading.appendChild(panelTitle);
	
	var panelBody = createElement('div','panel-body');
	
	//create the body
	
	//row 1
	var row1 = createElement('div','form-group');
	
	var illustrationLabel = createElement('label','control-label col-sm-2');
	illustrationLabel.innerHTML = "Illustratie:";
	
	var illustrationInputContainer = createElement('div','col-sm-6');
	var illustrationInput = createElement('input','file');
	illustrationInput.type = "file";
	
	var deleteButton = createElement('button','btn btn-danger col-sm-1 col-sm-offset-2');
	deleteButton.type = 'button';
	deleteButton.textContent = "Verwijder";
	deleteButton.onclick = deleteQuestion;

	illustrationInputContainer.appendChild(illustrationInput);
	
	row1.appendChild(illustrationLabel);
	row1.appendChild(illustrationInputContainer);
	row1.appendChild(deleteButton);
	//end row 1
	
	//row 2
	var row2 = createElement('div','form-group');
	var selectorLabel = createElement('label','control-label col-sm-2');
	selectorLabel.innerHTML = "Type:";
	var container = createElement('div', 'col-sm-6');
	var selector = createTypeSelector();
	
	container.appendChild(selector);
	row2.appendChild(selectorLabel);
	row2.appendChild(container);
	
	//end row 2

	//row 3
	var row3 = createElement('div','form-group');
	var inputLabel = createElement('label','control-label col-sm-2');
	inputLabel.innerHTML = "Vraag:";
	var inputContainer = createElement('div','col-sm-6');
	
	var input = createElement('input','form-control');
	input.type = "text";
	input.required = true;
	
	inputContainer.appendChild(input);
	row3.appendChild(inputLabel)
	row3.appendChild(inputContainer);
	//end row 3	
	//add row 4 as placeholder for multiple select and multiple choice
	var row4 = createElement('div','form-group');
	
	//end row 4
	//add rows to body
	panelBody.appendChild(row1);
	panelBody.appendChild(row2);
	panelBody.appendChild(row3);
	panelBody.appendChild(row4);
	//end of body
	
	panel.appendChild(panelHeading);
	panel.appendChild(panelBody);
	return panel;
}

function addQuestion(){
	var panel = createQuestionPanel();
	var div = document.getElementById('Questions');
	div.appendChild(panel);
}

function updateQuestionType(WindowEvent){
	var button = WindowEvent.target;
	var value = button.value; //question type
	var row4 = button.parentNode.parentNode.parentNode.children[3]; //row4 has options for multiple answer questions
	if (value === 'multipleChoice' || value ==='multipleSelect'){
		var optionLabelContainer = createElement('div','form-group');
		var optionLabel = createElement('label','control-label col-sm-3');
		optionLabel.innerHTML = "Voeg hier opties toe";
		optionLabelContainer.appendChild(optionLabel);
		
		var optionContainer = createElement('div','col-sm-12');
		for (var i = 0; i<2; i++){
			var group = createElement('div','form-group');
			
			var label = createElement('label','control-label col-sm-3');
			label.innerHTML = "Optie:"
			var inputContainer = createElement('div','col-sm-3'); //a little shorter than the rest to signify difference
			
			var input = createElement('input','form-control');
			input.type = "text";
			input.required = true;
			inputContainer.appendChild(input);
			
			group.appendChild(label);
			group.appendChild(inputContainer);
			optionContainer.appendChild(group);
		}
		var addOptionGroup = createElement('div','form-group');
		var addOptionContainer = createElement('div','col-sm-2 col-sm-offset-2');
		
		var button = createElement('button','btn btn-success');
		button.type = "button";
		button.textContent = "Voeg een optie toe";
		button.onclick = addOption;
		
		addOptionContainer.appendChild(button);
		addOptionGroup.appendChild(addOptionContainer);
		
		row4.appendChild(optionLabelContainer);
		row4.appendChild(optionContainer);
		row4.appendChild(addOptionGroup);
	} else {
		row4.innerHTML = "";
	}
}

function addOption(WindowEvent){
	var button = WindowEvent.target;
	var container = button.parentNode;
	var formGroup = container.parentNode;
	var questionContainer = formGroup.parentNode;
	var optionContainer = questionContainer.children[1];
	
	var optionGroup = createElement('div','form-group');
	
	var optionLabel = createElement('label','control-label col-sm-3');
	optionLabel.innerHTML = "Optie:"
		
	var inputContainer = createElement('div','col-sm-3');
	
	var input = createElement('input','form-control');
	input.type = "text";
	input.required = true;
	inputContainer.appendChild(input);
	
	
	var deleteButton = createElement('button','btn btn-danger col-sm-1 col-sm-offset-1');
	deleteButton.type = "button";
	deleteButton.onclick = deleteOption;
	deleteButton.textContent = "Verwijder";
	
	optionGroup.appendChild(optionLabel);
	optionGroup.appendChild(inputContainer);
	optionGroup.appendChild(deleteButton);
	
	optionContainer.appendChild(optionGroup);

}

function deleteOption(WindowEvent){
	var button = WindowEvent.target;
	var optionGroup = button.parentNode;
	var optionContainer = optionGroup.parentNode;
	optionContainer.removeChild(optionGroup);
}

function saveSurveyDetails(){
	var surveyName = document.getElementById('surveyName');
	var surveyStart = document.getElementById('surveyStart');
	var surveyEnd = document.getElementById('surveyEnd');
	changeReadOnly(surveyName);
	changeReadOnly(surveyStart);
	changeReadOnly(surveyEnd);
	var button = document.getElementById('saveButton');
	button.textContent = (button.textContent === "Bewaar") ? "Wijzig" : "Bewaar";
}

function deleteQuestion(WindowEvent){
	var button = WindowEvent.target;
	var formGroup = button.parentNode
	var panelBody = formGroup.parentNode;
	var panel = panelBody.parentNode;
	
	var questionContainer = panel.parentNode;
	questionContainer.removeChild(panel);
}

//row4 optionContent -> WindowEvent.target.parentNode.parentNode.parentNode.children[3].children.length