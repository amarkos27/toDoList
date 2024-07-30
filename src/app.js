import 'normalize.css';
import './style.css';
import { displayInit, displayForm } from './display/displayController.js';
import { createTask } from './taskManager.js';

function init() {
  displayInit(createTask);

  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', (e) => {
    // Needed so that the window event listener for closing the modal does not
    // immediately trigger
    e.stopPropagation();
    displayForm();
  });
}

init();
