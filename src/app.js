import 'normalize.css';
import './style.css';
import { DisplayController } from './display/displayController.js';
import { TaskManager } from './task/taskManager.js';
import { Project } from './project.js';

const display = new DisplayController();
const taskManager = new TaskManager();

function init() {
  display.initialize();
  let refresher = null;

  let form;
  const newTask = document.querySelector('.add-task');
  newTask.addEventListener('click', () => {
    form = display.newTaskModal(taskManager.projects);

    if (form) {
      form.modal.addEventListener('submit', (e) => {
        e.preventDefault();
        display.closeModal(form);
        handleFormSubmission(form.modal);

        refreshOpenPage();
      });
    }
  });

  const today = document.querySelector('.today');
  today.addEventListener('click', () => {
    const currentDate = new Date();
    const overdueTasks = taskManager.getOverdue(currentDate);
    const tasksToDisplay = taskManager.getTasksByDate(currentDate);
    const filterName = 'Today';

    // Add all tasks to display first and then split them into groups
    display.filterTasks(tasksToDisplay, filterName, today);

    // This is simply looking for tasks greater in *time* to the current time, so as not to be filtered in with overdue if
    // the task is on the current date but at a later time.
    const notOverdue = tasksToDisplay.filter(
      (task) => new Date(task.dateTime) > currentDate
    );

    if (overdueTasks.length) {
      display.formatOverdue(overdueTasks, notOverdue, filterName);
    }

    if (refresher) {
      clearInterval(refresher);
    }
    refresher = refreshOverdue(notOverdue, today);
  });

  const upcoming = document.querySelector('.upcoming');
  upcoming.addEventListener('click', () => {
    const currentDate = new Date();
    const overdueTasks = taskManager.getOverdue(currentDate);
    const upcomingTasks = taskManager.getFutureTasks(currentDate);
    const filterName = 'Upcoming';

    display.filterTasks(
      overdueTasks.concat(upcomingTasks),
      filterName,
      upcoming
    );

    if (overdueTasks.length) {
      display.formatOverdue(overdueTasks, upcomingTasks, filterName);
    }

    if (refresher) {
      clearInterval(refresher);
    }
    refresher = refreshOverdue(notOverdue, upcoming);
  });

  const allTasks = document.querySelector('.all');
  allTasks.addEventListener('click', () => {
    display.filterTasks(taskManager.tasks);
  });

  const newProject = document.querySelector('.add-project');
  newProject.addEventListener('click', () => {
    addProjectModal();
  });
}

function refreshOpenPage() {
  const openFilter = display.currentOpenFilter();
  if (openFilter) openFilter.click();
  else display.filterTasks(taskManager.tasks);
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
  task.display = taskDisplay;
  taskManager.storeTask(task);

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
  taskManager.removeProject(project.projectName);
}

function returnHome() {
  const allTasks = document.querySelector('.all');

  allTasks.click();
}

function filterByProject(project) {
  const tasksToDisplay = taskManager.getTasksByProject(project.projectName);
  const projectButton = project.display;

  display.filterTasks(tasksToDisplay, project.projectName, projectButton);
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

  const tasksToBeUpdated = taskManager.updateProject(
    project.projectName,
    updatedProject.projectName
  );
  display.updateProject(project, updatedProject);
  projectListeners(updatedProject);

  updateTaskDisplays(tasksToBeUpdated);

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
