/**
 * 
 */

function createElement(type, className){
	var el = document.createElement(type);
	el.setAttribute('class',className);
	return el;
}