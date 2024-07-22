import 'normalize.css';
import './style.css';
import { display_init, open_modal } from './display.js';

function init() {
  display_init();

  const new_task = document.querySelector('.add-task');
  new_task.addEventListener('click', () => {
    open_modal();
  });
}

init();
