const inputElement = document.querySelector('.input-element');
const addBtnEl = document.querySelector('.add-button');
const listContainer = document.querySelector('.list-container');

renderSavedValue();

addBtnEl.addEventListener('click', () => {
  let inputValue = inputElement.value;

  if (inputValue.trim() !== null) {
    saveToLocalStorage(inputValue);
    renderSavedValue();
    inputElement.value = '';
  }
});

function handleCheckbox(event) {
  const checkbox = event.target;
  const listItem = checkbox.closest('.list-item');
  listItem.style.opacity = checkbox.checked ? '50%' : '100%';
}

function saveToLocalStorage(value) {
  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];

  const now = new Date();
  const timeStamp = now.toLocaleString();

  savedValues.unshift({ text: value, timestamp: timeStamp });

  localStorage.setItem('savedValues', JSON.stringify(savedValues));
}

function renderSavedValue() {
  listContainer.innerHTML = '';

  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];

  savedValues.forEach((item) => {
    let date = document.createElement('div');
    date.className = 'date';
    date.textContent = `(Added on ${item.timestamp})`;

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';

    checkBox.addEventListener('change', handleCheckbox);

    let contentWrapper = document.createElement('div');
    contentWrapper.className = 'item-content-wrapper';

    contentWrapper.appendChild(checkBox);

    let textSpan = document.createElement('span');
    textSpan.innerHTML = `<span>${item.text}</span>`;

    contentWrapper.appendChild(textSpan);
    contentWrapper.appendChild(date);
    let listItem = document.createElement('li');
    listItem.className = 'list-item';

    listItem.appendChild(contentWrapper);
    // listItem.appendChild(checkBox);

    let removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      removeSaved(item.timestamp);
      renderSavedValue();
    });

    listItem.appendChild(removeButton);

    listContainer.appendChild(listItem);
  });
}

function removeSaved(timestamp) {
  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];
  const index = savedValues.findIndex((item) => item.timestamp === timestamp);

  if (index > -1) {
    savedValues.splice(index, 1);
    localStorage.setItem('savedValues', JSON.stringify(savedValues));
  }
}

/*


String Method:
Objective: Implement a search feature that allows users to filter tasks by keywords or phrases in their titles or descriptions. Use string methods to match the search term against the tasks.



Array Method:
Objective: Enhance the task management by using array methods to handle tasks more efficiently. For example, use map to update multiple tasks at once, filter to show only tasks that meet certain criteria, or reduce to calculate statistics like the total number of completed tasks.

 *include update/edit button beside remove  button
    i Show a date when it was edited
    ii Put the recently updated task on top of the list

*/
