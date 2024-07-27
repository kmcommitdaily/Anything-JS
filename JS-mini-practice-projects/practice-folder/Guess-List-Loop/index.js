const refused = document.querySelector('.refused');
const admit = document.querySelector('.admit');

const guests = [
  'Phil',
  'Kim',
  'Ethan',
  'Bryden',
  'Lola',
  'Fabio',
  'Bonjak',
  'Bumi',
];

admit.textContent = 'Admit: ';
refused.textContent = 'Refused: ';

for (const person of guests) {
  if (person === 'Fabio' || person === 'Bonjak') {
    refused.textContent += `${person}, `;
  } else {
    admit.textContent += `${person}, `;
  }
}

refused.textContent =
  refused.textContent.slice(0, refused.textContent.length - 2) + '.';
admit.textContent =
  admit.textContent.slice(0, admit.textContent.length - 2) + '.';
