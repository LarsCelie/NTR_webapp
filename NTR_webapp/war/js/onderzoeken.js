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