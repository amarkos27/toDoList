import 'normalize.css';
import './style.css';
import { displayInit, displayForm } from './display/displayController.js';

function init() {
  displayInit();

  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', (e) => {
    // Needed so that the window event listener for closing the modal does not
    // immediately trigger
    e.stopPropagation();
    displayForm();
  });
}

init();
