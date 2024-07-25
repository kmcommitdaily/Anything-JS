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

function handleCheckbox(event, timestamp) {
  const checkbox = event.target;
  const listItem = checkbox.closest('.list-item');
  const container = checkbox.closest('.list-container');
  listItem.style.opacity = checkbox.checked ? '50%' : '100%';
  listItem.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

  checkbox.checked
    ? container.appendChild(listItem)
    : container.insertBefore(listItem, container.firstChild);

  let savedValues = JSON.parse(localStorage.getItem('savedValues') || []);

  let item = savedValues.find((item) => item.timestamp === timestamp);
  if (item) {
    item.checked = checkbox.checked;
    localStorage.setItem('savedValues', JSON.stringify(savedValues));
  }
}

function saveToLocalStorage(value, isChecked = false) {
  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];

  const now = new Date();
  const timeStamp = now.toLocaleString();

  savedValues.unshift({
    text: value,
    timestamp: timeStamp,
    checked: isChecked,
  });

  localStorage.setItem('savedValues', JSON.stringify(savedValues));
}

function renderSavedValue() {
  listContainer.innerHTML = '';

  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];

  savedValues.forEach((item) => {
    let date = document.createElement('div');
    date.className = 'date';
    date.textContent = `(${timeSince(item.timestamp)})`;

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    checkBox.checked = item.checked;

    checkBox.addEventListener('change', (event) => {
      handleCheckbox(event, item.timestamp);
    });

    let contentWrapper = document.createElement('div');
    contentWrapper.className = 'item-content-wrapper';

    contentWrapper.appendChild(checkBox);

    let textSpan = document.createElement('span');
    textSpan.innerHTML = `<span>${item.text}</span>`;

    contentWrapper.appendChild(textSpan);
    contentWrapper.appendChild(date);
    let listItem = document.createElement('li');
    listItem.className = 'list-item';

    listItem.style.opacity = item.checked ? '50%' : '100%';
    listItem.style.textDecoration = item.checked ? 'line-through' : 'none';

    listItem.appendChild(contentWrapper);
    // listItem.appendChild(checkBox);

    let editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.className = 'edit-btn';

    let hideButton = document.createElement('button');
    hideButton.textContent = 'hide';
    hideButton.className = 'hide-btn';

    hideButton.addEventListener('click', handleHide);

    let removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      removeSaved(item.timestamp);
      renderSavedValue();
    });

    listItem.appendChild(hideButton);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    listContainer.appendChild(listItem);
  });
}

// improve this by saving to locale storage the hidden list

function handleHide(event) {
  let hideButton = event.target;
  let lisItem = hideButton.closest('.list-item');
  lisItem.style.display = 'none';
}

//study this thoroughly

function timeSince(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate month length
  const years = Math.floor(days / 365); // Approximate year length

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
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

 *include update/edit button beside remove  button
    i Show a date when it was edited
    ii Put the recently updated task on top of the list

 *Checkbox unchecked
    i Remove button ✅
    ii edit button ✅

 *Checkbox checked
    i Hide button will be shown ✅
    ii delete button display none
    iii edit button display none
    iii move the checked list at the bottom of the list ✅


 *Hide button clicked
    i list item display will be none v
    ii the state for hidden items will be saved to localeStorage

  *show completed button clicked
    i all hidden list will be shown
    i it will be saved to localeStorage


String Method:
Objective: Implement a search feature that allows users to filter tasks by keywords or phrases in their titles or descriptions. Use string methods to match the search term against the tasks.



Array Method:
Objective: Enhance the task management by using array methods to handle tasks more efficiently. For example, use map to update multiple tasks at once, filter to show only tasks that meet certain criteria, or reduce to calculate statistics like the total number of completed tasks.



*/
