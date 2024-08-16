import 'normalize.css';
import './style.css';
import {
  displayInit,
  displayForm,
  closeForm,
} from './display/displayController.js';
import { createTask } from './taskManager.js';

function init() {
  displayInit();

  const newTask = document.querySelector('.add-task');
  let form;
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

  const task = createTask(taskData);

  console.log(task);
}

init();
