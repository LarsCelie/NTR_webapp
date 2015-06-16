/**
 * 
 */

// Get JSON via JQuery Ajax
function getOnderzoeken() {

	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/NTR_application/rest/Research',
		success : function(data) {
			researchesObject = data;
			console.log(JSON.stringify(data));
			showResearches(data);
			console.log(data[0].name);
		},
		error : function(data) {
			console.log(data);
		}
	});

}

// Get Results
function getResults(surveyID) {
	
	$.ajax({
		type : "GET",
		url :'http://localhost:8080/NTR_application/rest/CSVResults/' + surveyID,
		success : function(data) {
			
		},
		error : function() {
			console.log('Errortjuh!');
		}
	});
	
}

var researchesObject = {};
var research;

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
		var numberOfSurveys = createElement('label', 'control-label col-sm-8');
			numberOfSurveys.innerHTML = 'Aantal surveys: ' + researches[i].surveys.length;
		var button = createElement('button', 'btn btn-success');
		button.id = i;
		button.innerHTML = 'Surveys';
		
		button.addEventListener('click', function(event) {
			var index = event.target.id;
			research = researchesObject[index];
			localStorage.setItem('research', JSON.stringify(research));
		    console.log(research);
		    window.location.assign("http://localhost:8888/html/survey.html")
		});
		
		panelHeading.appendChild(panelTitle);
		panelDiv.appendChild(panelHeading);
		panelDiv.appendChild(panelBody);
		formGroup.appendChild(statusLabel);
		formGroup.appendChild(BDateLabel);
		formGroup.appendChild(EDateLabel);
		formGroup.appendChild(numberOfSurveys);
		formGroup.appendChild(button);
		panelBody.appendChild(formGroup);
		container.appendChild(panelDiv);
	}
}

function showSurveys(research) {
	var research = localStorage.getItem('research');
	var jResearch = JSON.parse(research);
	console.log(jResearch);
	
	var container = document.getElementById('surveys');
	
	for (i = 0; i < jResearch.surveys.length; i++) {
		var panelDiv = createElement('div', 'panel panel-primary');
		var panelHeading = createElement('div', 'panel-heading');
		var panelTitle = createElement('h3', 'panel-title');
			panelTitle.innerHTML = jResearch.surveys[i].name;
		var panelBody = createElement('div', 'panel-body');
		var formGroup = createElement('div', 'form-group');
		var statusLabel = createElement('label', 'control-label col-sm-8');
			statusLabel.innerHTML = 'Status: ' + jResearch.surveys[i].status;
		var BDateLabel = createElement('label', 'control-label col-sm-8');
			BDateLabel.innerHTML = 'Begin datum: ' + jResearch.surveys[i].beginDate;
		var EDateLabel = createElement('label', 'control-label col-sm-8');
			EDateLabel.innerHTML = 'Eind datum: ' + jResearch.surveys[i].endDate;
		var button = createElement('button', 'btn btn-success');
		button.id = jResearch.surveys[i].id;
		button.innerHTML = 'Resultaten';
		
		button.addEventListener('click', function(event) {
			var id = event.target.id;
			console.log(id);
			getResults(id);
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
