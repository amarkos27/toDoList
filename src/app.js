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
        e.preventDefault();
        display.closeModal();
        handleFormSubmission(form);
      });
    }
  });
}

function handleFormSubmission(form) {
  const values = getValues(form);

  const task = taskManager.createTask(values);
  const { taskDisplay, actionButtons } = display.createNewTaskDisplay(task);
  taskManager.connectToDisplay(task, taskDisplay);
  taskManager.storeTask(task);

  actionListeners(actionButtons, task);
}

function getValues(formNode) {
  const formClass = formNode.classList[0];
  const values = {
    taskName: formNode.querySelector(`.${formClass} [name="task-name"]`).value,
    description: formNode.querySelector(`.${formClass} [name="description"]`)
      .value,
    dateTime: formNode
      .querySelector(`.${formClass} [name="date-and-time"]`)
      .value.split('T')
      .join(' '),
    project: formNode.querySelector(`.${formClass} [name="project"]`).value,
  };

  return values;
}

function actionListeners(actionButtons, task) {
  actionButtons.delete.addEventListener('click', () => {
    task.display.classList.add('deleted');
    task.display.addEventListener('transitionend', () => {
      display.removeTaskDisplay(task.display);
      taskManager.removeTask(task);
    });
  });
  actionButtons.edit.addEventListener('click', () => {
    const editPane = display.editTask(task);
    editPaneListeners(editPane, task);
  });
}

function editPaneListeners(editPane, task) {
  const cancel = editPane.querySelector('#cancel-edit');

  cancel.addEventListener('click', () => {
    cancelEdit(editPane, task);
  });

  editPane.addEventListener('submit', (e) => {
    e.preventDefault();
    task = submitEdit(editPane, task);
  });
}

function valuesChanged(current, task) {
  if (
    current.taskName !== task.taskName ||
    current.description !== task.description ||
    current.dateTime !== task.dateTime ||
    current.project !== task.project
  ) {
    return true;
  } else return false;
}

function cancelEdit(editPane, task) {
  const current = getValues(editPane);

  if (valuesChanged(current, task)) {
    console.log(current, task);
    const cancelModal = display.confirmCancel();
    const { cancelDiscard, discard } = cancelModal.cancelButtons;

    cancelDiscard.addEventListener('click', () =>
      display.closeCancelModal(cancelModal.cancelOverlay)
    );

    discard.addEventListener('click', () => {
      display.closeCancelModal(cancelModal.cancelOverlay);
      display.closeEdit(task.display, editPane);
    });
  } else {
    display.closeEdit(task.display, editPane);
  }
}

function submitEdit(editPane, task) {
  const newValues = getValues(editPane);

  if (valuesChanged(newValues, task)) {
    task = taskManager.updateTask(task, newValues);

    const { taskDisplay, actionButtons } = display.createNewTaskDisplay(task);
    display.closeEdit(taskDisplay, editPane);
    taskManager.connectToDisplay(task, taskDisplay);
    actionListeners(actionButtons, task);

    return task;
  } else display.closeEdit(task.display, editPane);
}

init();
