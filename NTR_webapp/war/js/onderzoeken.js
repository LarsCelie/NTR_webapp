/**
 * 
 */

// Get JSON via JQuery Ajax
function getOnderzoeken() {
	$.ajax({
		
		type: "GET",
		url: 'http://localhost:8080/NTR_application/rest/Research',
		success: function(data) {
			console.log(data);
		},
		error: function() {
			console.log('ERROR!');
		}
	});
}


function showResearchPanel(researchData){
	var panel = createElement('div','panel panel-info');
	//panel.id = researchData.id;
	var panelHeader = createElement('div','panel-heading');
	var headerTitle = createElement('h1','panel-title');
	//headerTitle.innerHTML = researchData.name;
	panelHeader.append(headerTitle);
	
	var panelBody = createElement('div','panel-body');
	
	
	
	panel.appendChild(panelHeader);
	panel.appendChild(panelBody);
}
