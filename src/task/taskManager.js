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

  connectToDisplay(task, taskDisplay) {
    task.attach(taskDisplay);
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

  get projects() {
    return this.#projects;
  }
}

export { TaskManager };
