const list = document.querySelector('.list');
const searchInput = document.querySelector('.input-value');
const searchBtn = document.querySelector('.search-btn');

const myHistory = [];

function renderSearchHistory() {
  // how can i make this function reusable?

  list.textContent = '';
  let searchValue = searchInput.value;

  if (searchValue !== '') {
    myHistory.unshift(searchValue);
  }

  if (myHistory.length >= 5) {
    myHistory.pop();
  }
  for (const history of myHistory) {
    const lisItem = document.createElement('li');
    lisItem.textContent = history;
    list.appendChild(lisItem);
  }

  searchInput.value = '';
  searchInput.focus();
}

searchInput.addEventListener('keydown', searchEnter);

function searchEnter(event) {
  if (event.key === 'Enter') {
    renderSearchHistory();
  }
}

searchBtn.addEventListener('click', renderSearchHistory);
