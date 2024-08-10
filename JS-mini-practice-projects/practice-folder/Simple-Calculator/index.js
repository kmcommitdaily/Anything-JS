const resultInput = document.querySelector('.result-input');
const calcContainer = document.querySelector('.calc-container');
const buttons = document.querySelectorAll('.calc-container button');

const equals = document.querySelector('.equal');
const resetBtn = document.querySelector('.reset');

let toCalculate = [];
let currentOperation = null;
let calculationDone = false;
let result;
resultInput.value = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => handleCalculation(button));
});

equals.addEventListener('click', handleResult);

resetBtn.addEventListener('click', () => {
  resultInput.value = 0;
  toCalculate = [];
  currentOperation = null;
  calculationDone = false;
});

//functions

function handleCalculation(button) {
  const operator = ['x', '+', '-', '÷'];
  const value = button.innerHTML;

  if (calculationDone) {
    if (operator.includes(value)) {
      toCalculate = [result];
      resultInput.value = toCalculate;
      calculationDone = false;
      console.log(result);
    } else {
      toCalculate = [];
      resultInput.value = '';
      calculationDone = false;
    }
  }

  if (!isNaN(parseFloat(value))) {
    if (currentOperation) {
      toCalculate.length > 0 && toCalculate.push(currentOperation);
      currentOperation = null;
    }
    toCalculate.push(value);
    resultInput.value = toCalculate.join('');
  } else if (operator.includes(value)) {
    currentOperation = value;
  }
}

function handleResult() {
  if (toCalculate.length > 0) {
    let expression = toCalculate.join('');
    console.log(expression);

    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

    try {
      result = eval(expression);
      resultInput.value = Number.isInteger(result) ? result : result.toFixed(2);
      toCalculate = [result];
      calculationDone = true;
    } catch (error) {
      resultInput.value = 'Error';
      console.error('Error evaluating expression:', error);
      toCalculate = [];
      calculationDone = false;
    }
  }
}
