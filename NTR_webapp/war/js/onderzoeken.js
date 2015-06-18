/**
 * 
 */

// Get Researches
function getOnderzoeken() {
	$.ajax({
		type : 'GET',
		url : 'http://92.109.48.222:7070/NTR_application/rest/research',
		success : function(data) {
			researchesObject = data;
			showResearches(data);
		},
		error : function(data) {
			console.log(data);
		}
	});
}

// Get Surveys by Research ID
function getSurveys(researchID) {
	$.ajax({
		type : 'GET',
		url : 'http://92.109.48.222:7070/NTR_application/rest/survey/research/' + researchID,
		success : function(data) {
			console.log("hoi");
			console.log(data);
			surveysJson = data;
			showSurveyPanels(surveysJson);
		},
		error : function(data) {
			console.log(data);
		}
	});
}

// Get Results
function getResults(surveyID) {
	$.ajax({
		type : 'GET',
		url :'http://92.109.48.222:7070/NTR_application/rest/answer/' + surveyID,
		success : function(data) {
			console.log(data);
		},
		error : function(data) {
			console.log(data);
		}
	});
}

//Global variabels
var researchesObject = {};
var research;

// Function that creates panels for each research
function showResearches(researches) {
	
	var container = document.getElementById('onderzoeken');

	for (i = 0; i < researches.length; i++) {
		var panelDiv = createElement('div', 'panel panel-primary');
		var panelHeading = createElement('div', 'panel-heading');
		var panelTitle = createElement('h3', 'panel-title');
			panelTitle.innerHTML = researches[i].name;
		var panelBody = createElement('div', 'panel-body');
		var formGroup = createElement('div', 'form-group');
		var statusLabel = createElement('label', 'control-label col-sm-8');
			statusLabel.innerHTML = 'Status: ' + researches[i].status;
		var BDateLabel = createElement('label', 'control-label col-sm-8');
			BDateLabel.innerHTML = 'Begin datum: ' + researches[i].beginDate;
		var EDateLabel = createElement('label', 'control-label col-sm-8');
			EDateLabel.innerHTML = 'Eind datum: ' + researches[i].endDate;
//		var numberOfSurveys = createElement('label', 'control-label col-sm-8');
//			numberOfSurveys.innerHTML = 'Aantal surveys: ' + researches[i].surveys.length;
		var button = createElement('button', 'btn btn-success');
		button.id = i;
		button.innerHTML = 'Surveys';
		
		button.addEventListener('click', function(event) {
			var index = event.target.id;
			console.log(index);
			research = researchesObject[index];
			console.log(research);
			localStorage.setItem('research', JSON.stringify(research));
		    window.location.assign("http://localhost:8888/html/survey.html")
		});
		
		panelHeading.appendChild(panelTitle);
		panelDiv.appendChild(panelHeading);
		panelDiv.appendChild(panelBody);
		formGroup.appendChild(statusLabel);
		formGroup.appendChild(BDateLabel);
		formGroup.appendChild(EDateLabel);
//		formGroup.appendChild(numberOfSurveys);
		formGroup.appendChild(button);
		panelBody.appendChild(formGroup);
		container.appendChild(panelDiv);
	}
}

function showSurveys(research) {
	
	var research = localStorage.getItem('research');
	var jResearch = JSON.parse(research);
	
	console.log(jResearch);
	researchID = jResearch.id;
	getSurveys(researchID);
}

function showSurveyPanels(surveysJson) {
	
	var container = document.getElementById('surveys');
	
	for (i = 0; i < surveysJson.length; i++) {
		var panelDiv = createElement('div', 'panel panel-primary');
		var panelHeading = createElement('div', 'panel-heading');
		var panelTitle = createElement('h3', 'panel-title');
			panelTitle.innerHTML = surveysJson[i].name;
		var panelBody = createElement('div', 'panel-body');
		var formGroup = createElement('div', 'form-group');
		var statusLabel = createElement('label', 'control-label col-sm-8');
			statusLabel.innerHTML = 'Status: ' + surveysJson[i].status;
		var BDateLabel = createElement('label', 'control-label col-sm-8');
			BDateLabel.innerHTML = 'Begin datum: ' + surveysJson[i].beginDate;
		var EDateLabel = createElement('label', 'control-label col-sm-8');
			EDateLabel.innerHTML = 'Eind datum: ' + surveysJson[i].endDate;
		var button = createElement('button', 'btn btn-success');
		button.id = surveysJson[i].id;
		button.innerHTML = 'Resultaten';
		
		button.addEventListener('click', function(event) {
			var id = event.target.id;
			console.log(id);
			window.location.assign('http://92.109.48.222:7070/NTR_application/rest/answer/' + id);
			//getResults(id);
		});
		
		panelHeading.appendChild(panelTitle);
		panelDiv.appendChild(panelHeading);
		panelDiv.appendChild(panelBody);
		formGroup.appendChild(statusLabel);
		formGroup.appendChild(BDateLabel);
		formGroup.appendChild(EDateLabel);
		formGroup.appendChild(button);
		panelBody.appendChild(formGroup);
		container.appendChild(panelDiv);
	}
}
