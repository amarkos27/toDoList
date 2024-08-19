import 'normalize.css';
import './style.css';
import { DisplayController } from './display/displayController.js';
import { TaskManager } from './task/taskManager.js';

const display = new DisplayController();
const taskManager = new TaskManager();

function init() {
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
        const { taskDisplay, actionButtons } = display.createTaskDisplay(task);
        taskManager.connectToDisplay(task, taskDisplay);

        actionListeners(taskDisplay, actionButtons, task);
      });
    }
  });
}

function actionListeners(taskDisplay, actionButtons, task) {
  actionButtons.delete.addEventListener('click', () => {
    taskDisplay.classList.add('deleted');

    taskDisplay.addEventListener('transitionend', () => {
      display.removeTaskDisplay(taskDisplay);
      taskManager.removeTask(task);
    });
  });

  actionButtons.edit.addEventListener('click', () => {});
}

init();
