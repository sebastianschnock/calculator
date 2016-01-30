import calculate from './calculator';

(() => {

	let calcElem = document.querySelector('.calc');
	let displayElem = calcElem.querySelector('.calc__display');
	
	// set up digit and operator buttons
	for(let elem of calcElem.querySelectorAll('[data-calc-input]')) {
		addInput(elem, elem.dataset.calcInput);
	}

	// set up calculate button
	let calculateElem = calcElem.querySelector('.calc__main--calculate');
	calculateElem.addEventListener('click', () => {
		displayElem.textContent = calculate(displayElem.textContent);
	});

	// set up clear button
	let clearElem = calcElem.querySelector('.calc__main--clear');
	clearElem.addEventListener('click', () => {
		displayElem.textContent = '';
	});


	function addInput(elem, input) {
		elem.addEventListener('click', () => {
			displayElem.textContent += `${input}`;
		});
	}

})(document)
