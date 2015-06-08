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
	
	var panel = document.createElement('div');
	panel.setAttribute('class','panel panel-primary');
	
	var panelHeader = document.createElement('div');
	panelHeader.setAttribute('class', 'panel-heading');		
	panel.appendChild(panelHeader);
	
	var panelTitle = document.createElement('h1');
	panelTitle.setAttribute('class', 'panel-title');
	panelTitle.id = sVraag + counter + sType;
	panelTitle.innerHTML = counter+ ': ' +questionType;
	panelHeader.appendChild(panelTitle);
	
	var panelBody = document.createElement('div');
	panelBody.setAttribute('class', 'panel-body');	
	var input;
	if(questionType == 'multipleSelect' || questionType == 'multipleChoice') {
		input = createQuestion(false);
	} else {
		input = createQuestion(true);
	}
	panelBody.appendChild(input);
	panel.appendChild(panelBody);
	div.appendChild(panel);
}

function createQuestion(normal) {
	
	var sVraag = 'vraag';
	var sType = 'type';
	var sValue = 'value';
	
	var div = document.createElement('div');
	div.setAttribute('class','row');
	
	//attachment
	var labelAttachment = document.createElement('label');
	labelAttachment.setAttribute('class','control-label col-sm-1');
	labelAttachment.innerHTML = "Illustratie:";
	
	var inputAttachmentDiv = document.createElement('div');
	inputAttachmentDiv.setAttribute('class','col-sm-5');
	
	var inputAttachment = document.createElement('input');
	inputAttachment.type = "file";
	inputAttachment.accept = "file_extension|audio/*|video/*|image/*|media_type";
	inputAttachment.placeholder = "Voeg uw bestand toe";
	inputAttachmentDiv.appendChild(inputAttachment);
	//attachment
	
	//question
	var labelQuestion = document.createElement('label');
	labelQuestion.setAttribute('class','control-label col-sm-1');
	labelQuestion.innerHTML = "Vraag:";
	
	var inputDiv = document.createElement('div');
	inputDiv.setAttribute('class','col-sm-5');
	
	var input = document.createElement('input');
	input.type = "text";
	input.setAttribute('class','form-control');
	input.placeholder = "Vul hier de vraag in";
	//question
	
//	div.appendChild(labelAttachment);
//	div.appendChild(inputAttachmentDiv);
//	
//	div.appendChild(document.createElement('br'));
	
	div.appendChild(labelQuestion);
	div.appendChild(inputDiv);
	inputDiv.appendChild(input);
	
	
	
	if (normal) {
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
		
		return form;
		
	}
	
}

function addOption(optionBtn) {
	
	var x = optionBtn.target.parentNode; //form
	
	var row = document.createElement('div');
	row.setAttribute('class','row');
	
	var label = document.createElement('label');
	label.setAttribute('class', 'control-label col-sm-2');
	label.innerHTML = "Optie:";
	
	var inputDiv = document.createElement('div');
	inputDiv.setAttribute('class','col-sm-3');
	
	var input = document.createElement('input');
	input.type = "text";
	input.setAttribute('class','form-control');
	input.placeholder = "Vul hier je optie in";
	row.appendChild(document.createElement('br'));
	
	row.appendChild(label);
	row.appendChild(inputDiv);
	inputDiv.appendChild(input);
	
	x.children[1].appendChild(row);
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