const submitBtn = document.querySelector('.submit-btn');
const nameField = document.querySelector('.name-field');
const nationality = document.querySelector('.nationality');
const paraGreetings = document.querySelector('.greetings');
let americanGreetings = [
  'Hello',
  'Hi',
  'Hey',
  'Howdy',
  "What's up",
  'Greetings',
  'Yo',
];

const filipinoGreetings = [
  'Kamusta',
  'Kumusta ka',
  'Magandang Araw',
  'Mabuhay!',
];

function checkNationality() {
  let yourName = nameField.value;
  let nationalityVal = nationality.value;

  let randomFilipinoGreeting = Math.floor(
    Math.random() * filipinoGreetings.length
  );
  let randomAmericaGreeting = Math.floor(
    Math.random() * americanGreetings.length
  );

  if (nationalityVal === 'american') {
    paraGreetings.textContent = `${americanGreetings[randomAmericaGreeting]} ${yourName}`;
  } else if (nationalityVal === 'filipino') {
    paraGreetings.textContent = `${filipinoGreetings[randomFilipinoGreeting]} ${yourName}`;
  } else {
    paraGreetings.textContent = 'Please Select a Nationality';
  }

  nameField.value = '';
  nameField.focus();
}

submitBtn.addEventListener('click', checkNationality);
