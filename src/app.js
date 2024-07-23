import 'normalize.css';
import './style.css';
import { display_init, new_task_form } from './display.js';

function init() {
  display_init();

  const new_task = document.querySelector('.add-task');
  new_task.addEventListener('click', () => {
    new_task_form();
  });
}

init();
