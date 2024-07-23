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

    let listItem = document.createElement('li');
    listItem.innerHTML = `${item.text}  <br> ${date.outerHTML}`;
    listItem.className = 'list-item';

    let removeButton = document.createElement('button');
    removeButton.textContent = 'x';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      removeSaved(item.timestamp);
      renderSavedValue();
    });

    listItem.appendChild(removeButton);
    // listContainer.insertBefore(listItem, listContainer.firstChild);
    listContainer.appendChild(listItem);
  });
}

function removeSaved(timestamp) {
  let savedValues = JSON.parse(localStorage.getItem('savedValues')) || [];
  // const index = savedValues.indexOf('savedValues');
  // savedValues.splice(index, 1);

  const index = savedValues.findIndex((item) => item.timestamp === timestamp);

  if (index > -1) {
    savedValues.splice(index, 1);
    localStorage.setItem('savedValues', JSON.stringify(savedValues));
  }
}

// Simple To Do List
// this is to apply my object, function and DOM knowledge
// when i clicked the add button +
// the input value will be save to local storage +
// and will be posted under list Container +
// the value that are posted should not disappear when i reload my browser
// the saved value should be listed in array whenever i put or add another inputValue

//Improving project
// to apply: numbers, string, and array methods

/** Numbers Method:
Objective: Add functionality to sort tasks by their due date or priority level. For example, if each task has a numerical priority or deadline, implement a feature that sorts the task list based on these numbers.


* put number before list
* sort task from more recent to oldest
   > compute the array length
   > get the last index of an array
   > put it on top


String Method:
Objective: Implement a search feature that allows users to filter tasks by keywords or phrases in their titles or descriptions. Use string methods to match the search term against the tasks.



Array Method:
Objective: Enhance the task management by using array methods to handle tasks more efficiently. For example, use map to update multiple tasks at once, filter to show only tasks that meet certain criteria, or reduce to calculate statistics like the total number of completed tasks.

 *include update/edit button beside remove  button
    i Show a date when it was edited
    ii Put the recently updated task on top of the list

*/
