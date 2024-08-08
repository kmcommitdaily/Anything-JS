const resultInput = document.querySelector('.result-input');
const calcContainer = document.querySelector('.calc-container');
const buttons = document.querySelectorAll('.calc-container button');

const multiply = document.querySelector('.multiply');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const divide = document.querySelector('.divide');
const equals = document.querySelector('.equal');
const resetBtn = document.querySelector('.reset');

let toCalculate = [];
let currentOperation = null;
let calculationDone = false;
resultInput.value = 0;

const operationArray = [multiply, minus, plus, divide, equals];

function disabledButton(button) {
  return (button.disabled = true);
}

function enabledButton(button) {
  return (button.disabled = false);
}

operationArray.forEach((button) => disabledButton(button));

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = ['x', '+', '-', '÷'];
    const value = button.innerHTML;

    if (calculationDone) {
      // If the last action was "=" start a new calculation
      toCalculate = [];
      resultInput.value = '';
      calculationDone = false;
    }

    if (!isNaN(parseFloat(value))) {
      if (currentOperation) {
        toCalculate.push(currentOperation);
        currentOperation = null;
      }
      toCalculate.push(value);
      resultInput.value = toCalculate.join('');
      operationArray.forEach((button) => enabledButton(button));
    } else if (operator.includes(value)) {
      currentOperation = value;
    }
  });
});

equals.addEventListener('click', () => {
  if (toCalculate.length > 0) {
    let expression = toCalculate.join('');
    console.log(expression);

    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

    try {
      const result = eval(expression);
      resultInput.value = Number.isInteger(result) ? result : result.toFixed(2);
      toCalculate = [result];
      calculationDone = true; // Set flag to true after "=" is pressed
      operationArray.forEach((button) => disabledButton(button));
    } catch (error) {
      resultInput.value = 'Error';
      console.error('Error evaluating expression:', error);
      toCalculate = [];
      calculationDone = false;
    }
  }
});

resetBtn.addEventListener('click', () => {
  resultInput.value = 0;
  toCalculate = [];
  currentOperation = null;
  operationArray.forEach((button) => disabledButton(button));
});
