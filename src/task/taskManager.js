import { Task } from './task.js';
class TaskManager {
  #tasks = [];
  #projects = [];

  createTask(values) {
    const task = new Task(values);

    return task;
  }

  storeTask(task) {
    this.#tasks.push(task);
  }

  updateTask(task, values) {
    const index = this.#tasks.indexOf(task);
    const newTask = this.createTask(values);
    this.#tasks.splice(index, 1, newTask);

    return newTask;
  }

  removeTask(task) {
    const index = this.#tasks.indexOf(task);
    this.#tasks.splice(index, 1);
  }

  addProject(projectName) {
    this.#projects.push(projectName);
  }

  removeProject(projectName) {
    const index = this.#projects.indexOf(projectName);

    this.#projects.splice(index, 1);
  }

  getTasksByProject(projectName) {
    return this.#tasks.filter((task) => task.project === projectName);
  }

  getOverdue(date) {
    return this.#tasks.filter((task) => {
      const taskDate = new Date(task.dateTime.replace(' ', 'T'));

      return taskDate < date;
    });
  }

  getTasksByDate(date) {
    return this.#tasks.filter((task) => {
      const taskDate = new Date(task.dateTime.replace(' ', 'T'));

      return taskDate === date;
    });
  }

  updateProject(oldProject, updatedProject) {
    const tasksToBeUpdated = this.getTasksByProject(oldProject);

    for (const task of tasksToBeUpdated) {
      task.project = updatedProject;
    }

    const index = this.#projects.indexOf(oldProject);
    this.#projects.splice(index, 1, updatedProject);

    return tasksToBeUpdated;
  }

  get projects() {
    return this.#projects;
  }

  get tasks() {
    return this.#tasks;
  }
}

export { TaskManager };
