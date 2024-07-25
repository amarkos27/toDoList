import 'normalize.css';
import './style.css';
import { displayInit, displayForm } from './display/displayController.js';

function init() {
  displayInit();

  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', () => {
    displayForm();
  });
}

init();
