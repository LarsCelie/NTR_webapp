/**
 * 
 */

function createElement(type, className){
	var el = document.createElement(type);
	el.setAttribute('class',className);
	return el;
}

function createOption(value, visual){
	var opt = document.createElement('option');
	opt.value = value;
	opt.innerHTML = visual;
	return opt;
}

function changeReadOnly(element){
	element.readOnly = (element.readOnly == true) ? false : true;
}
