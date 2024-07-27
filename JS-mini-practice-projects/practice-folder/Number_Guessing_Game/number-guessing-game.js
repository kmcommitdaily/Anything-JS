const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const resultParas = document.querySelector('.resultParas');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

let randomGuess = Math.floor(Math.random() * 100) + 1;

let guessCount = 1;
let resetButton;

function checkGuess() {
  // how can i make this function reusable?

  const userGuess = Number(guessField.value);

  if (guessCount === 1) {
    guesses.textContent = 'Previous Guess; ';
  }

  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  if (userGuess === randomGuess) {
    lastResult.textContent = 'You Got It!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = 'Game Over';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Try Again';
    lastResult.style.backgroundColor = 'red';

    if (userGuess > randomGuess) {
      lowOrHi.textContent = 'Last Guess is too high';
    } else {
      lowOrHi.textContent = 'Last Guess is too low';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'reset';

  document.body.appendChild(resetButton);

  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;

  const resultParas = document.querySelectorAll('.resultParas p');

  lastResult.style.backgroundColor = 'white';

  for (const resultPara of resultParas) {
    resultPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  guessCount = 1;

  randomGuess = Math.floor(Math.random() * 100) + 1;
}

/**
 since reset button is used in many functions , declare it on top
 initialize the guess count
 defined a random Guesss
 User will put value in the guessField value
 when submit button is clicked

    i. the guessField value will be compared to randomGuess value
     (create a function for checkGuess)
        i.a if guessField value === randomGuess value
            i.a.1 last result = 'You win'
            i.a.2 last result background color = green
            i.a.3 setGameOver()
            i.a.4 lowOrHi = ''
        i.b if guessField value > 10
            i.b.1 lastresult = 'game over'
            i.b.2 lowOrHi = ''
            a.b.3 setGameOver()
        i.c else
            i.c.1 lastresult = wrong
            i.c.1 last result background 'red'

        i.d if guessField value > random number
             i.d.1 lowOrhi = your last guess is high
             i.d.2 loworHi = your last guess is low

  (create a function for setGameOver)
    i. once called
      * the guess field will be disabled
      * submit will be disabled
      * reset button will be created
      * document.body will append reset button
      * add event listener to reset button passing reset game


  (create a functionfor resetgame)
    i. once called
      * guessCount will set to 1
      * will target all the child of resetParas
      * will reset the value of the children of result paras
      *     resetbutton,parentNode,reoveChild(reset button)

       * the guess field will be abled
      * submit will be abled
      * guess field = ''
      * guessField = focus

      *lastresult background will be white

      *assign a random number again
 */
