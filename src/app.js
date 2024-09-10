import 'normalize.css';
import './style.css';
import { DisplayController } from './display/displayController.js';
import { TaskManager } from './task/taskManager.js';
import { Project } from './project.js';

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
    form = display.newTaskModal(taskManager.projects);

    if (form) {
      form.modal.addEventListener('submit', (e) => {
        e.preventDefault();
        display.closeModal(form);
        handleFormSubmission(form.modal);
      });
    }
  });

  const newProject = document.querySelector('.add-project');
  newProject.addEventListener('click', (e) => {
    e.stopPropagation();
    addProjectModal();
  });
}

function addProjectModal() {
  const projectModal = display.newProjectModal();
  const input = projectModal.modal.firstChild;

  projectModal.submit.addEventListener('click', () => {
    display.closeModal(projectModal);
    handleProjectSubmission(input.value);
  });

  input.addEventListener('keydown', (e) => {
    const validInput = /\S+/;
    if (e.key === 'Enter' && input.value.match(validInput)) {
      display.closeModal(projectModal);
      handleProjectSubmission(input.value);
    }
  });
}

function handleProjectSubmission(projectName) {
  const project = new Project(projectName);
  display.addProject(project.display);
  taskManager.addProject(project.projectName);

  projectListeners(project);
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

function projectListeners(project) {
  project.deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmDelete(project);
  });

  project.editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    editProjectModal(project);
  });

  project.display.addEventListener('click', (e) => {
    if (e.target.type !== 'div') {
      const header = document.createElement('h1');
      header.textContent = project.projectName;
      document.querySelector('.items-wrapper').prepend(header);
    }
  });
}

function confirmDelete(project) {
  const deleteModal = display.confirmDelete(project.projectName);

  deleteModal.confirm.addEventListener('click', () => {
    deleteProject(project);
  });
}

function deleteProject(project) {
  const tasks = taskManager.getTasksByProject(project.projectName);

  for (const task of tasks) {
    if (display.isTaskDisplayed(task.display)) {
      display.removeTaskDisplay(task.display);
    }
    taskManager.removeTask(task);
  }
  display.removeProject(project.display);
  taskManager.removeProject(project.projectName);
}

function editProjectModal(project) {
  const projectModal = display.newProjectModal(project.projectName);
  const input = projectModal.modal.firstChild;

  const handleSubmit = () => {
    const newProjectName = input.value;
    if (newProjectName !== project.projectName) {
      confirmEditProject(project, newProjectName);
    } else {
      display.closeModal(projectModal);
    }
  };

  projectModal.submit.addEventListener('click', () => {
    handleSubmit();
  });

  input.addEventListener('keydown', (e) => {
    const validInput = /\S+/;
    if (e.key === 'Enter' && input.value.match(validInput)) {
      handleSubmit();
    }
  });
}

function confirmEditProject(project, newProjectName) {
  const confirmEditModal = display.confirmEditProject(
    project.projectName,
    newProjectName
  );

  confirmEditModal.confirm.addEventListener('click', () => {
    editProject(project, newProjectName);
  });
}

function editProject(project, newProjectName) {
  const updatedProject = new Project(newProjectName);

  const tasksToBeUpdated = taskManager.updateProject(
    project.projectName,
    updatedProject.projectName
  );
  display.updateProject(project, updatedProject);
  projectListeners(updatedProject);

  updateTaskDisplays(tasksToBeUpdated);
}

function updateTaskDisplays(tasksToBeUpdated) {
  for (const task of tasksToBeUpdated) {
    const oldDisplay = task.display;
    const { taskDisplay, actionButtons } = display.updateTaskOfProject(
      task,
      oldDisplay
    );

    task.display = taskDisplay;
    actionListeners(actionButtons, task);
  }
}

function actionListeners(actionButtons, task) {
  actionButtons.checkbox.addEventListener('click', () => {
    completeTask(actionButtons.checkbox, task);
  });

  actionButtons.delete.addEventListener('click', () => {
    removeTask(task);
  });

  actionButtons.edit.addEventListener('click', () => {
    const editPane = display.editTask(task, taskManager.projects);
    editPaneListeners(editPane, task);
  });
}

function removeTask(task) {
  task.display.classList.add('deleted');
  task.display.addEventListener('transitionend', () => {
    display.removeTaskDisplay(task.display);
    taskManager.removeTask(task);
  });
}

function completeTask(checkbox, task) {
  const check = checkbox.children[0];
  check.classList.add('completed');

  check.addEventListener('animationend', () => {
    removeTask(task);
  });
}

function editPaneListeners(editPane, task) {
  const cancel = editPane.cancel;

  cancel.addEventListener('click', () => {
    cancelEdit(editPane, task);
  });

  editPane.modal.addEventListener('submit', (e) => {
    e.preventDefault();
    task = submitEdit(editPane, task);
  });
}

function cancelEdit(editPane, task) {
  const current = getValues(editPane.modal);

  if (valuesChanged(current, task)) {
    const cancelModal = display.confirmCancel();

    cancelModal.confirm.addEventListener('click', () => {
      display.closeEdit(task.display, editPane.modal);
    });
  } else {
    display.closeEdit(task.display, editPane.modal);
  }
}

function submitEdit(editPane, task) {
  const newValues = getValues(editPane.modal);

  if (valuesChanged(newValues, task)) {
    task = taskManager.updateTask(task, newValues);

    const { taskDisplay, actionButtons } = display.createNewTaskDisplay(task);
    display.closeEdit(taskDisplay, editPane.modal);
    taskManager.connectToDisplay(task, taskDisplay);
    actionListeners(actionButtons, task);

    return task;
  } else display.closeEdit(task.display, editPane.modal);
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

init();
