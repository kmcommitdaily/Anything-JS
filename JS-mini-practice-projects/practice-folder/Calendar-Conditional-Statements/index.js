const selection = document.querySelector('.selection');
const listContainer = document.querySelector('.list-container');
const title = document.querySelector('.title');
const themeSelection = document.querySelector('.theme-selection');

selection.addEventListener('change', () => {
  const choice = selection.value;
  let days = 31;

  if (choice === 'February') {
    days = 28;
  } else if (
    choice === 'April' ||
    choice === 'June' ||
    choice === 'September' ||
    choice === 'November'
  ) {
    days = 30;
  }

  createCalendar(days, choice);
});

function createCalendar(days, choice) {
  listContainer.textContent = '';
  title.textContent = choice;
  for (let i = 1; i <= days; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = i;
    listItem.className = 'lisItem';
    listContainer.appendChild(listItem);
  }
}

themeSelection.addEventListener('change', () => {
  let theme = themeSelection.value;

  theme === 'Dark' ? updateTheme('black', 'grey') : updateTheme('grey', 'dark');
});

function updateTheme(bgColor, textColor) {
  document.documentElement.style.backgroundColor = bgColor;
  document.documentElement.style.color = textColor;
}
