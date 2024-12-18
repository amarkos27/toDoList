import 'normalize.css';
import './style.css';
import { DisplayController } from './display/displayController.js';
import { TaskManager } from './task/taskManager.js';
import { Project } from './project.js';

const display = new DisplayController();
const taskManager = new TaskManager();

function init() {
  display.initialize();
  setUpButtons();

  taskManager.setUpStorage();

  if (taskManager.tasks.length) {
    for (const task of taskManager.tasks) {
      // Set up button listeners for locally retrieved tasks
      const editDelete = task.display.querySelector('.actions').children;
      const actionButtons = {
        checkbox: task.display.children[0],
        delete: editDelete[1],
        edit: editDelete[0],
      };

      actionListeners(actionButtons, task);
    }

    display.displayTasks(taskManager.tasks);
  }

  if (taskManager.projects.length) {
    for (const project of taskManager.projects) {
      const buttons = project.display.children[0];

      const editBtn = buttons.children[0];
      const deleteBtn = buttons.children[1];
      project.editBtn = editBtn;
      project.deleteBtn = deleteBtn;

      display.addProject(project.display);
      projectListeners(project);
    }
  }
}

function setUpButtons() {
  let refresher = null;

  let form;
  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', () => {
    form = display.newTaskModal(taskManager.projects);
    form.modal.scrollIntoView();

    if (form) {
      form.modal.addEventListener('submit', (e) => {
        e.preventDefault();
        display.closeModal(form);
        handleFormSubmission(form.modal);

        refreshOpenPage();
      });
    }
  });

  const search = document.querySelector('.search');
  search.addEventListener('click', () => {
    display.setFilter();
    const { searchInput, datePicker } = display.createSearchInput();

    const callback = (textInput, date) => {
      const trimmed = textInput === '' ? null : textInput.trimStart();
      let inputDate;

      if (date !== '') {
        const split = date.split('-');
        const year = Number(split[0]);
        const month = Number(split[1]) - 1; // because month starts at 0
        const day = Number(split[2]);

        inputDate = new Date(year, month, day);
      } else inputDate = null;

      const tasks = taskManager.getTasksByQuery(trimmed, inputDate);
      display.displayTasks(tasks);
    };

    searchInput.addEventListener('input', () =>
      callback(searchInput.value, datePicker.value)
    );

    datePicker.addEventListener('input', () =>
      callback(searchInput.value, datePicker.value)
    );
  });

  const today = document.querySelector('.today');
  today.addEventListener('click', () => {
    const currentDate = new Date();
    const notOverdue = taskManager
      .getTasksByDate(currentDate)
      .filter((task) => new Date(task.dateTime) > currentDate); // refers to tasks that are today, but later in terms of time

    refresher = handleDateFilter(currentDate, notOverdue, today, refresher);
  });

  const upcoming = document.querySelector('.upcoming');
  upcoming.addEventListener('click', () => {
    const currentDate = new Date();
    const notOverdue = taskManager.getFutureTasks(currentDate);

    refresher = handleDateFilter(currentDate, notOverdue, upcoming, refresher);
  });

  const allTasks = document.querySelector('.all');
  allTasks.addEventListener('click', () => {
    display.setFilter();
    display.displayTasks(taskManager.tasks);
  });

  const newProject = document.querySelector('.add-project');
  newProject.addEventListener('click', () => {
    addProjectModal();
  });
}

function refreshOpenPage() {
  const openFilter = display.currentOpenFilter();
  if (openFilter) {
    openFilter.click();
  } else {
    returnHome();
  }
}

function handleDateFilter(currentDate, notOverdue, filter, refresher) {
  const overdueTasks = taskManager.getOverdue(currentDate);
  const filterName = filter.textContent;

  display.setFilter(filterName, filter);
  display.displayTasks(overdueTasks.concat(notOverdue));

  if (overdueTasks.length) {
    display.formatOverdue(overdueTasks, notOverdue, filterName);
  }

  if (refresher) {
    clearInterval(refresher);
  }
  refresher = refreshOverdue(notOverdue, filter);

  return refresher;
}

function refreshOverdue(notOverdue, filter) {
  const intervalId = setInterval(() => {
    if (display.currentOpenFilter() === filter && notOverdue.length) {
      for (const task of notOverdue) {
        if (new Date(task.dateTime) < new Date()) {
          filter.click();
          clearInterval(intervalId);
          return;
        }
      }
    } else {
      clearInterval(intervalId);
    }
  }, 1000);

  return intervalId;
}

function addProjectModal() {
  const projectModal = display.newProjectModal();
  const input = projectModal.modal.firstChild;

  projectModal.modal.scrollIntoView();
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
  taskManager.addProject(project);
  taskManager.refreshStorage();

  projectListeners(project);
}

function handleFormSubmission(form) {
  const values = getValues(form);

  const task = taskManager.createTask(values);
  const { taskDisplay, actionButtons } = display.createNewTaskDisplay(task);
  task.display = taskDisplay;
  taskManager.storeTask(task);
  taskManager.refreshStorage();

  actionListeners(actionButtons, task);
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

function projectListeners(project) {
  project.deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    confirmDelete(project);
  });

  project.editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    editProjectModal(project);
  });

  project.display.addEventListener('click', () => {
    filterByProject(project);
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
    taskManager.removeTask(task);
    if (display.taskIsDisplayed(task.display)) {
      display.removeTaskDisplay(task.display);
    }
  }

  if (display.currentOpenFilter() === project.display) {
    returnHome();
  }

  display.removeProject(project.display);
  taskManager.removeProject(project);
  taskManager.refreshStorage();
}

function returnHome() {
  const allTasks = document.querySelector('.all');

  allTasks.click();
}

function filterByProject(project) {
  const tasksToDisplay = taskManager.getTasksByProject(project.projectName);
  const projectButton = project.display;

  display.setFilter(project.projectName, projectButton);
  display.displayTasks(tasksToDisplay);
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
      input.blur();
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

  const tasksToBeUpdated = taskManager.updateProject(project, updatedProject);
  display.updateProject(project, updatedProject);
  projectListeners(updatedProject);

  updateTaskDisplays(tasksToBeUpdated);

  taskManager.refreshStorage();

  updatedProject.display.click();
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
    taskManager.refreshStorage();
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
    submitEdit(editPane, task);

    refreshOpenPage();
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
    task.display = taskDisplay;

    taskManager.refreshStorage();
    actionListeners(actionButtons, task);
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
