import 'normalize.css';
import './style.css';
import { DisplayController } from './display/displayController.js';
import { TaskManager } from './task/taskManager.js';

function init() {
  const display = new DisplayController();
  const taskManager = new TaskManager();

  display.initialize();

  let form;
  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', (e) => {
    // Needed so that the window event listener for closing the modal does not
    // immediately trigger
    e.stopPropagation();
    form = display.openModal();

    if (form) {
      form.addEventListener('submit', (e) => {
        display.closeModal();
        const task = taskManager.createTask(e);
        const { taskDisplay, actions } = display.createTaskDisplay(task);
        taskManager.connectToDisplay(task, taskDisplay);

        actions.delete.addEventListener('click', () => {
          display.removeTaskDisplay(taskDisplay);
          taskManager.removeTask(task);
        });
      });
    }
  });
}

init();
