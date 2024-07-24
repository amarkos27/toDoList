import 'normalize.css';
import './style.css';
import { display_init, display_new_task } from './display.js';

function init() {
  display_init();

  const new_task = document.querySelector('.add-task');
  new_task.addEventListener('click', () => {
    display_new_task();
  });
}

init();
