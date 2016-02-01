import calculate from './calculator';
import { isNumeric } from './helpers';

/**
 * This is the main entry point to the calculator app gui.
 * It sets up functionality of the buttons and triggers the calculation and
 * display of the result.
 */

(() => {

	// fix NodeList iteration on chrome
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	let calcElem = document.querySelector('.calc');
	let displayElem = calcElem.querySelector('.calc__expression');
	
	// set up digit and operator buttons
	for(let elem of calcElem.querySelectorAll('[data-calc-input]')) {
		addInput(elem, elem.dataset.calcInput);
	}

	// set up calculate button
	calcElem.querySelector('.calc__main--calculate').addEventListener('click', () => {
		displayElem.textContent = calculate(displayElem.textContent);
	});

	// set up clear button
	calcElem.querySelector('.calc__main--clear').addEventListener('click', () => {
		displayElem.textContent = '';
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
			displayElem.textContent += `${input}`;
		});
	}

})(document)
