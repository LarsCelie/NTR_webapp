/**
 * 
 */

// Get JSON via JQuery Ajax
function getOnderzoeken() {

	$.ajax({
		type : "GET",
		url : 'http://localhost:8080/NTR_application/rest/Research',
		success : function(data) {
			console.log(JSON.stringify(data));
			showResearches(data);
			console.log(data[0].name);
		},
		error : function(data) {
			console.log(data);
		}
	});

}

function showResearches(researches) {

	var container = document.getElementById('onderzoeken');

	for (i = 0; i < researches.length; i++) {
		var panelDiv = document.createElement('div');
		panelDiv.setAttribute('class', 'panel panel-primary');

		var panelHeading = document.createElement('div');
		panelHeading.setAttribute('class', 'panel-heading');

		var panelTitle = document.createElement('h3');
		panelTitle.setAttribute('class', 'panel-title');
		panelTitle.innerHTML = researches[i].name;

		var panelBody = document.createElement('div');
		panelBody.setAttribute('class', 'panel-body');

		var formGroup = document.createElement('div');
		formGroup.setAttribute('class', 'form-group');

		var BDateLabel = document.createElement('label');
		BDateLabel.setAttribute('class', 'control-label col-sm-8');
		BDateLabel.innerHTML = 'Begin datum: ' + researches[i].beginDate;

		var EDateLabel = document.createElement('label');
		EDateLabel.setAttribute('class', 'control-label col-sm-8');
		EDateLabel.innerHTML = 'Eind datum: ' + researches[i].endDate;

		// Mappings enzo
		panelHeading.appendChild(panelTitle);
		panelDiv.appendChild(panelHeading);
		panelDiv.appendChild(panelBody);
		formGroup.appendChild(BDateLabel);
		formGroup.appendChild(EDateLabel);
		panelBody.appendChild(formGroup);
		container.appendChild(panelDiv);

	}

}