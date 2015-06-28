/**
 * 
 */

// Get Researches
function getOnderzoeken() {
	$.ajax({
		type : 'GET',
		url : 'http://92.109.52.61:7070/NTR_application/rest/research',
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
		url : 'http://92.109.52.61:7070/NTR_application/rest/survey/research/' + researchID,
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
		url :'http://92.109.52.61:7070/NTR_application/rest/answer/' + surveyID,
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

// Function that creates cards for each research
function showResearches(researches) {
	
	var container = document.getElementById('onderzoeken');

	for (i = 0; i < researches.length; i++) {
		var button = createElement('button', 'btn btn-warning');
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
		
		var heroDiv = createElement('div', 'col-md-3 col-sm-6 hero-feature');
		var heroThumb = createElement('div', 'thumbnail');
		var image = createElement('img', '');
		image.setAttribute('src', '../Awesome.png');
		
		var caption = createElement('div', 'caption');
		var header = createElement('h3', '');
			header.innerHTML = researches[i].name;
		var bdate = createElement('p', '');
			bdate.innerHTML = 'Begindatum: ' + researches[i].beginDate;
		var edate = createElement('p', '');
			edate.innerHTML = 'Einddatum: ' + researches[i].endDate;
			
		
		heroDiv.appendChild(heroThumb);
		heroThumb.appendChild(image);
		heroThumb.appendChild(caption);
		caption.appendChild(header);
		caption.appendChild(bdate);
		caption.appendChild(edate);
		caption.appendChild(button);
		
		container.appendChild(heroDiv);
		
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
			
		var button = createElement('button', 'btn btn-warning');
		button.id = surveysJson[i].id;
		button.innerHTML = 'Resultaten';
		
		button.addEventListener('click', function(event) {
			var id = event.target.id;
			console.log(id);
			window.location.assign('http://92.109.52.61:7070/NTR_application/rest/answer/' + id);
		});
		
		var heroDiv = createElement('div', 'col-md-3 col-sm-6 hero-feature');
		var heroThumb = createElement('div', 'thumbnail');
		
		var caption = createElement('div', 'caption');
		var header = createElement('h3', '');
			header.innerHTML = surveysJson[i].name;
		var bdate = createElement('p', '');
			bdate.innerHTML = 'Begindatum: ' + surveysJson[i].beginDate;
		var edate = createElement('p', '');
			edate.innerHTML = 'Einddatum: ' + surveysJson[i].endDate;
			
		heroDiv.appendChild(heroThumb);
		heroThumb.appendChild(caption);
		caption.appendChild(header);
		caption.appendChild(bdate);
		caption.appendChild(edate);
		caption.appendChild(button);

		container.appendChild(heroDiv);
		
	}
}

function toUberform(){
	window.location.assign('http://localhost:8888/html/uberform.html');
}
