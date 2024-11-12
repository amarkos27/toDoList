import { Task } from './task.js';
import { toDOM, toJSON } from 'dom-to-json';
class TaskManager {
  #tasks = [];
  #projects = [];

  createTask(values) {
    const task = new Task(values);

    return task;
  }

  storeTask(task) {
    const found = this.#tasks.findIndex(
      (existing) =>
        !existing.dateTime ||
        new Date(existing.dateTime) > new Date(task.dateTime)
    );
    if (this.#tasks.length && task.dateTime && found !== -1)
      this.#tasks.splice(found, 0, task);
    else this.#tasks.push(task);
  }

  updateTask(task, values) {
    const index = this.#tasks.indexOf(task);
    this.#tasks.splice(index, 1);

    const newTask = this.createTask(values);
    this.storeTask(newTask);

    return newTask;
  }

  removeTask(task) {
    const index = this.#tasks.indexOf(task);
    this.#tasks.splice(index, 1);
  }

  addProject(project) {
    this.#projects.push(project);
  }

  removeProject(project) {
    const index = this.#projects.indexOf(project);

    this.#projects.splice(index, 1);
  }

  getTasksByProject(project) {
    return this.#tasks.filter((task) => task.project === project);
  }

  getOverdue(date) {
    return this.#tasks.filter((task) => {
      const taskDate = new Date(task.dateTime);

      return taskDate < date;
    });
  }

  compareDatesWithoutTime(first, second) {
    return (
      `${first.getMonth()}-${first.getDate()}-${first.getFullYear()}` ===
      `${second.getMonth()}-${second.getDate()}-${second.getFullYear()}`
    );
  }

  getTasksByDate(date) {
    return this.#tasks.filter((task) => {
      const taskDate = new Date(task.dateTime);

      return this.compareDatesWithoutTime(taskDate, date);
    });
  }

  getTasksByName(taskName) {
    return this.#tasks.filter((task) =>
      task.taskName.toUpperCase().includes(taskName.toUpperCase())
    );
  }

  getFutureTasks(date) {
    return this.#tasks.filter((task) => {
      const taskDate = new Date(task.dateTime);

      return taskDate > date;
    });
  }

  getTasksByQuery(taskName, date) {
    if (taskName && !date) {
      return this.getTasksByName(taskName);
    } else if (date && !taskName) {
      return this.getTasksByDate(date);
    } else if (taskName && date) {
      return this.#tasks.filter(
        (task) =>
          task.taskName.toUpperCase().includes(taskName.toUpperCase()) &&
          this.compareDatesWithoutTime(new Date(task.dateTime), date)
      );
    } else {
      return [];
    }
  }

  updateProject(oldProject, updatedProject) {
    const tasksToBeUpdated = this.getTasksByProject(oldProject.projectName);

    for (const task of tasksToBeUpdated) {
      task.project = updatedProject.projectName;
    }

    const index = this.#projects.indexOf(oldProject);
    this.#projects.splice(index, 1, updatedProject);

    return tasksToBeUpdated;
  }

  storeTasks() {
    let taskNames = [];
    this.#tasks.forEach((task) => {
      taskNames.push(task.taskName);
      task.JSONdisplay = toJSON(task.display);
      localStorage.setItem(`${task.taskName}`, JSON.stringify(task));
    });
    localStorage.setItem('taskNames', JSON.stringify(taskNames));
  }

  storeProjects() {
    let projectNames = [];
    this.#projects.forEach((project) => {
      // Do not store the button as active if it is currently clicked when the user exits the screen
      project.display.classList.remove('clicked');

      project.JSONdisplay = toJSON(project.display);
      projectNames.push(project.projectName);
      localStorage.setItem(`#${project.projectName}`, JSON.stringify(project));
    });
    localStorage.setItem('projectNames', JSON.stringify(projectNames));
  }

  refreshStorage() {
    localStorage.clear();
    this.storeTasks();
    this.storeProjects();
  }

  retrieveTasks() {
    if (localStorage.getItem('taskNames')) {
      const taskNames = JSON.parse(localStorage.getItem('taskNames'));

      if (taskNames.length) {
        for (const taskName of taskNames) {
          const task = JSON.parse(localStorage.getItem(`${taskName}`));
          task.display = toDOM(task.JSONdisplay);
          this.#tasks.push(task);
        }
      }
    }
  }

  retrieveProjects() {
    if (localStorage.getItem('projectNames')) {
      const projectNames = JSON.parse(localStorage.getItem('projectNames'));

      if (projectNames.length) {
        for (const projectName of projectNames) {
          const project = JSON.parse(localStorage.getItem(`#${projectName}`));
          project.display = toDOM(project.JSONdisplay);
          this.#projects.push(project);
        }
      }
    }
  }

  setUpStorage() {
    this.retrieveTasks();
    this.retrieveProjects();
  }

  get projects() {
    return this.#projects;
  }

  get tasks() {
    return this.#tasks;
  }
}

export { TaskManager };
