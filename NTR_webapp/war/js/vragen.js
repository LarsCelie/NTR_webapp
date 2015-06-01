/**
 * 
 */

function addQuestion(questionType) {
	var div = document.createElement('form');
	$(div).addClass('form-horizontal')
	var label = document.createElement('label')
	$(label).text('Vul hier uw vraag in: ');

}

function createSurvey() {
	var json = {
		"questions" : []
	};

	var cntr = 1;
	var id = "vraag" + cntr + "type";
	var element = document.getElementById(id);
	while (element !== undefined) {
		
		
		
		
		cntr++;
		id = "vraag" + cntr + "type";
		element = document.getElementById(id);
	}

}