const resultInput = document.querySelector('.result-input');
const calcContainer = document.querySelector('.calc-container');
const buttons = document.querySelectorAll('.calc-container button');
const historyBtn = document.querySelector('.history');
const historyContainer = document.querySelector('.history-container');

const equals = document.querySelector('.equal');
const resetBtn = document.querySelector('.reset');
const operator = ['x', '+', '-', '÷'];
let toCalculate = [];
let currentOperation = null;
let calculationDone = false;
let result;
let histories = [];
let expression;
resultInput.value = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let value = button.innerHTML;
    handleCalculation(value);
  });
});

console.log(historyBtn.addEventListener('click', () => {}));

historyBtn.addEventListener('click', () => {
  handleHistory();
  calculationDone = true;
});

equals.addEventListener('click', handleResult);

resetBtn.addEventListener('click', () => {
  resultInput.value = 0;
  toCalculate = [];
  currentOperation = null;
  calculationDone = false;
  histories = [];
  historyContainer.innerHTML = '';
});

resultInput.addEventListener('keydown', (e) => {
  const value = e.target.value;
  if (e.key === 'Enter') {
    e.preventDefault();
    handleCalculation(value);
    handleResult();
    e.target.focus();
  }
});

//functions

function handleHistory() {
  historyContainer.innerHTML = '';
  histories.forEach((history) => {
    console.log(history.expression);
    console.log(history.result);
    const modifiedExpression = history.expression
      .replace(/\*/g, 'x')
      .replace(/\//g, '÷');

    const historyHeader = document.createElement('h3');

    historyHeader.textContent = `${modifiedExpression} = ${history.result}`;
    historyHeader.className = 'history-area';

    historyContainer.appendChild(historyHeader);
  });
}

function handleCalculation(value) {
  if (calculationDone) {
    if (operator.includes(value)) {
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
    expression = toCalculate.join('');

    expression = expression.replace(/x/g, '*').replace(/÷/g, '/');

    try {
      result = eval(expression);
      resultInput.value = Number.isInteger(result) ? result : result.toFixed(2);

      console.log(histories.result);
      toCalculate = [result];
      calculationDone = true;
    } catch (error) {
      resultInput.value = 'Error';
      console.error('Error evaluating expression:', error);
      toCalculate = [];
      calculationDone = false;
    }

    histories.push({ expression, result });
  }
}
