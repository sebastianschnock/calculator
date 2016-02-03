(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _calculator = require('./calculator');

var _calculator2 = _interopRequireDefault(_calculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the main entry point to the calculator app gui.
 * It sets up functionality of the buttons and triggers the calculation and
 * display of the result.
 */

(function () {

	// fix NodeList iteration on chrome
	NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

	var calcElem = document.querySelector('.calc');
	var displayElem = calcElem.querySelector('.calc__expression');
	var clearOnInput = true;

	// set up digit and operator buttons
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = calcElem.querySelectorAll('[data-calc-input]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var elem = _step.value;

			addInput(elem, elem.dataset.calcInput);
		}

		// set up calculate button
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	calcElem.querySelector('.calc__main--calculate').addEventListener('click', function () {
		var result = (0, _calculator2.default)(displayElem.textContent);
		if (!Number.isFinite(result)) clearOnInput = true;
		displayElem.textContent = result;
	});

	// set up clear button
	calcElem.querySelector('.calc__main--clear').addEventListener('click', function () {
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
		elem.addEventListener('click', function () {
			if (clearOnInput) {
				displayElem.textContent = '';
				clearOnInput = !clearOnInput;
			}
			displayElem.textContent += '' + input;
		});
	}
})(document);

},{"./calculator":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _shuntingYard = require('./shunting-yard');

var _shuntingYard2 = _interopRequireDefault(_shuntingYard);

var _evaluatePostfix = require('./evaluate-postfix');

var _evaluatePostfix2 = _interopRequireDefault(_evaluatePostfix);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Calculates a mathematical expression in infix notation.
 *
 * @method     calculate
 * @param      {String}  expr  an expression in infix notation (eg. '1 + 2 * 3')
 * @return     {Number}  the calulated result, or NaN when the expression was misformed
 */
function calculate(expr) {
	var normalized = normalizePre(expr);
	var infix = (0, _shuntingYard2.default)(normalized);
	var result = undefined;
	try {
		result = (0, _evaluatePostfix2.default)(infix);
	} catch (err) {
		return Number.NaN;
	}
	return normalizePost(result);
}

function normalizePre(expr) {
	// handle special case: expression starts with a negative number
	return expr.trim().replace(/^-\s/, '0 - ');
}

function normalizePost(result) {
	// round floats to deal with floating point arithmetic
	// see http://floating-point-gui.de/
	// also remove trailing zeros
	return Number.parseFloat(result.toFixed(_config2.default.floatPrecision));
}

exports.default = calculate;

},{"./config":3,"./evaluate-postfix":4,"./shunting-yard":7}],3:[function(require,module,exports){
module.exports={
	"floatPrecision": 10
}
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _operators = require('./operators');

var _operators2 = _interopRequireDefault(_operators);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Evaluates a mathematical expression in postfix notation.
 *
 * @method     evaluate
 * @param      {String}	postfix  an expression in postfix notation
 * @returns    {Number}	the result of the evaluation
 * @throws     {Error} an exception when the expression is misformed
 * 
 * Note: the different tokens in the expression must be separated by whitespace.
 * For example: "1 2 +" instead of "1 2+"
 */
function evaluate(postfix) {

	var operandStack = [];
	var operand = undefined;
	var operator = undefined;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = postfix.split(' ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var token = _step.value;

			// collect numbers
			if ((0, _helpers.isNumeric)(operand = Number.parseFloat(token))) {
				operandStack.push(operand);
			}

			// evaluate operators
			else if ((operator = (0, _operators2.default)(token)) !== null) {
					var _operator;

					if (operandStack.length < operator.numOperands) throw "Not enough operands";
					var operands = operandStack.splice(-operator.numOperands, operator.numOperands);
					var operationResult = (_operator = operator).evaluate.apply(_operator, _toConsumableArray(operands));
					operandStack.push(operationResult);
				} else {
					throw "Unknown token";
				}
		}

		// after everything there should be only one number - the result
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	if (operandStack.length !== 1) throw "Too many operands";
	return operandStack[0];
}

exports.default = evaluate;

},{"./helpers":5,"./operators":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumeric = isNumeric;
function isNumeric(n) {
  return !Number.isNaN(Number.parseFloat(n)) && Number.isFinite(n);
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * The list of operators.
 * 
 * An operator has the following properties:
 * symbol			-	a unique symbol as an identifier
 * precedence		-	precendence value for the Shunting-yard algorithm
 * leftAssociative 	-	left- or right-associative, for the Shunting-yard algorithm
 * numOperands		-	the number of operands this operator works with
 * evalute			-	the function that gets evaluated when using this operator
 *
 * @type       {Array}
 */
var operators = [{
	symbol: '+',
	precedence: 2,
	leftAssociative: true,
	numOperands: 2,
	evaluate: function evaluate(x, y) {
		return x + y;
	}
}, {
	symbol: '-',
	precedence: 2,
	leftAssociative: true,
	numOperands: 2,
	evaluate: function evaluate(x, y) {
		return x - y;
	}
}, {
	symbol: '÷',
	precedence: 3,
	leftAssociative: true,
	numOperands: 2,
	evaluate: function evaluate(x, y) {
		return x / y;
	}
}, {
	symbol: '×',
	precedence: 3,
	leftAssociative: true,
	numOperands: 2,
	evaluate: function evaluate(x, y) {
		return x * y;
	}
}, {
	symbol: '^',
	precedence: 4,
	leftAssociative: false,
	numOperands: 2,
	evaluate: function evaluate(x, y) {
		return Math.pow(x, y);
	}
}];

/**
 * Returns the operator object for a given symbol.
 *
 * @method     getOperator
 * @param      {String}  symbol  a symbol like "+"
 * @return     {Object}  the found operator object or null
 */
function getOperator(symbol) {
	var operator = operators.find(function (o) {
		return o.symbol === symbol;
	});
	return operator !== undefined ? operator : null;
}

exports.default = getOperator;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _operators = require('./operators');

var _operators2 = _interopRequireDefault(_operators);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Converts a string in infix notation to postfix oder Reverse Polish notation.
 * eg: "1 + 2" would be converted to "1 2 +"
 * This function uses the "Shunting-yard algorithm".
 * 
 * @method     convertInfixToPostfix
 * @param      {String}	infix   the string in infix to convert
 * @return     {String}	the converted string in postfix notation
 * 
 * Note: the different tokens in the expression must be separated by whitespace.
 * For example: "1 + 2" instead of "1+2". The whitespace separation is taken over to the result.
 */
function convertInfixToPostfix(infix) {

	var output = [];
	var oprStack = [];
	var opr = undefined;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = infix.split(' ')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var token = _step.value;

			// write numbers first
			if ((0, _helpers.isNumeric)(Number.parseFloat(token))) {
				output.push(token);
			}

			// collect operators to write later
			else if ((opr = (0, _operators2.default)(token)) !== null) {
					// higher precedence operators should be written earlier
					while (oprStack.length > 0 && (opr.leftAssociative && opr.precedence <= oprStack[oprStack.length - 1].precedence || !opr.leftAssociative && opr.precedence < oprStack[oprStack.length - 1])) {

						output.push(oprStack.pop().symbol);
					}

					oprStack.push(opr);
				}
		}

		// add rest of the operator stack to the output queue
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	output.push.apply(output, _toConsumableArray(oprStack.map(function (o) {
		return o.symbol;
	}).reverse()));

	return output.join(' ');
}

exports.default = convertInfixToPostfix;

},{"./helpers":5,"./operators":6}]},{},[1]);
