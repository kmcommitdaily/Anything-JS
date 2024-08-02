const takeTestBtn = document.querySelector('.take-test-btn');
const CreateTestBtn = document.querySelector('.create-test-btn');
let mainContainer = document.querySelector('.main-container');
const testContainer = document.querySelector('.test-container');
const scoreEl = document.querySelector('.score');
let questions = [];
let questionIndex = 0;
let score = 0;

async function fetchQuestions() {
  try {
    const response = await fetch('questions.json');
    questions = await response.json();
    questionIndex = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    displayQuestion();
  } catch (error) {
    console.error('error:', error);
  }
}

function displayQuestion() {
  if (questionIndex >= questions.length) {
    let message = '';
    if (score <= 2) {
      message = '<p>Review the Fundamentals again</p>';
    } else if (score <= 10) {
      message = '<p>Not bad!</p>';
    } else if (score > 10) {
      message = '<p>You have great knowledge about JavaScript</p>';
    }
    testContainer.innerHTML = message;
    scoreEl.textContent = `TOTAL SCORE: ${score}`;
    return;
  }

  const data = questions[questionIndex];

  testContainer.innerHTML = ''; // Clear previous content

  const questionEl = document.createElement('p');
  questionEl.textContent = data.question;
  questionEl.className = 'question';

  testContainer.appendChild(questionEl);

  const answers = data.answers;
  for (const answer of answers) {
    const answerBtn = document.createElement('input');
    answerBtn.setAttribute('type', 'button'); // Change to 'button' instead of 'submit'
    answerBtn.value = answer.text;
    answerBtn.className = 'choice';
    answerBtn.isCorrect = answer.correct;
    answerBtn.addEventListener('click', handleChoiceClick);
    testContainer.appendChild(answerBtn);
  }
}

function handleChoiceClick(event) {
  const isCorrect = event.target.isCorrect;
  if (isCorrect) {
    event.target.style.backgroundColor = 'green';
    score++;
  } else {
    event.target.style.backgroundColor = 'red';

    // Find the correct answer button and set its border to green
    const answerButtons = document.querySelectorAll('.choice');
    answerButtons.forEach((button) => {
      if (button.isCorrect) {
        button.style.borderColor = 'green';
        button.style.borderWidth = '5px';
        button.style.borderStyle = 'solid';
      }
    });
  }

  setTimeout(() => {
    scoreEl.textContent = `Score: ${score}`;
    questionIndex++;
    displayQuestion();
  }, 1000);
}

takeTestBtn.addEventListener('click', fetchQuestions);
