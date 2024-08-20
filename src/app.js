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
      form.addEventListener('submit', handleFormSubmission);
    }
  });
}

function getValues(formNode) {
  const formClass = formNode.classList[0];
  const values = {
    taskName: formNode.querySelector(`.${formClass} [name="task-name"]`).value,
    description: formNode.querySelector(`.${formClass} [name="description"]`)
      .value,
    dateTime: formNode.querySelector(`.${formClass} [name="date-and-time"]`)
      .value,
    project: formNode.querySelector(`.${formClass} [name="project"]`).value,
  };

  return values;
}

function handleFormSubmission(e) {
  display.closeModal();
  e.preventDefault();

  const form = e.currentTarget;
  const values = getValues(form);

  const task = taskManager.createTask(values);
  const { taskDisplay, actionButtons } = display.createTaskDisplay(task);
  taskManager.connectToDisplay(task, taskDisplay);

  actionListeners(taskDisplay, actionButtons, task);
}

function actionListeners(taskDisplay, actionButtons, task) {
  actionButtons.delete.addEventListener('click', () => {
    taskDisplay.classList.add('deleted');

    taskDisplay.addEventListener('transitionend', () => {
      display.removeTaskDisplay(taskDisplay);
      taskManager.removeTask(task);
    });
  });

  actionButtons.edit.addEventListener('click', () => {
    const editPane = display.addEditPane(taskDisplay, task);
    display.removeTaskDisplay(taskDisplay);

    editPaneListeners(editPane, task);
  });
}

function cancelEdit(editPane, task) {
  const current = getValues(editPane);

  if (
    current.taskName !== task.taskName ||
    current.description !== task.description ||
    current.dateTime !== task.dateTime ||
    current.project !== task.project
  ) {
  } else {
    display.cancelEdit(editPane, task.display);
  }
}

function editPaneListeners(editPane, task) {
  const cancel = editPane.querySelector('#cancel-edit');
  cancel.addEventListener('click', () => {
    cancelEdit(editPane, task);
  });
}

init();
