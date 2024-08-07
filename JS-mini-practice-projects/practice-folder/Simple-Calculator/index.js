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

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = ['x', '+', '-', '÷'];
    const value = button.innerHTML;

    if (!isNaN(parseFloat(value))) {
      if (currentOperation) {
        toCalculate.push(currentOperation);
        currentOperation = null;
      }
      toCalculate.push(value);
      resultInput.value = toCalculate.join(' ');
    } else if (operator.includes(value)) {
      currentOperation = value;
    }
  });
});

equals.addEventListener('click', () => {
  if (toCalculate.length > 0) {
    let expression = toCalculate.join(' ');

    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

    try {
      const result = eval(expression);
      resultInput.value = result;
      toCalculate = [result];
    } catch (error) {
      resultInput.value = 'Error';
    }
  }
});

resetBtn.addEventListener('click', () => {
  resultInput.value = '';
  toCalculate = [];
  currentOperation = null;
});
