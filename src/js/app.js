import calculate from './calculator';

/**
 * This is the main entry point to the calculator app gui.
 * It sets up functionality of the buttons and triggers the calculation and
 * display of the result.
 */

(() => {

	// fix NodeList iteration on chrome
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	const calcElem = document.querySelector('.calc');
	const displayElem = calcElem.querySelector('.calc__expression');
	let clearOnInput = true;
	
	// set up digit and operator buttons
	for(let elem of calcElem.querySelectorAll('[data-calc-input]')) {
		addInput(elem, elem.dataset.calcInput);
	}

	// set up calculate button
	calcElem.querySelector('.calc__main--calculate').addEventListener('click', () => {
		const result = calculate(displayElem.textContent);
		if(!Number.isFinite(result)) clearOnInput = true;
		displayElem.textContent = result;
	});

	// set up clear button
	calcElem.querySelector('.calc__main--clear').addEventListener('click', () => {
		displayElem.textContent = '0';
		clearOnInput = true;
	});


	/**
	 * Sets up a button to provide an input token to the expression when clicked.
	 * The token will be added to the calculators display.
	 *
	 * @method     addInput
	 * @param      {DOMElement}  elem    the DOM element that provides input when clicked
	 * @param      {String}  input   the input token that is added
	 */
	function addInput(elem, input) {
		elem.addEventListener('click', () => {
			if(clearOnInput) {
				displayElem.textContent = '';
				clearOnInput = !clearOnInput;
			}
			displayElem.textContent += `${input}`;
		});
	}

})(document)
