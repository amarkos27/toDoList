import 'normalize.css';
import './style.css';
import {
  displayInit,
  displayForm,
  closeForm,
} from './display/displayController.js';

function init() {
  displayInit();

  let form;
  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', (e) => {
    // Needed so that the window event listener for closing the modal does not
    // immediately trigger
    e.stopPropagation();
    form = displayForm();

    if (form) {
      form.addEventListener('submit', handleFormSubmission);
    }
  });
}

function handleFormSubmission(e) {
  e.preventDefault();
  const form = e.currentTarget;
  closeForm();

  const taskData = {
    taskName: form.querySelector('#task-name').value,
    description: form.querySelector('#description').value,
    dateTime: form.querySelector('#date-time').value,
    project: form.querySelector('#select-project').value,
  };
}

init();
