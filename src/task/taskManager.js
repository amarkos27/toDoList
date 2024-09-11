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

  getTasksByDate(date) {
    for (const task of this.tasks) {
      console.log(task.dateTime.split(' ')[0] === date.split('T')[0]);
    }
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
