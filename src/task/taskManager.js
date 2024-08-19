import { Task } from './task.js';
class TaskManager {
  #tasks = [];

  createTask(e) {
    e.preventDefault();
    const form = e.currentTarget;

    const task = new Task(form);
    this.#tasks.push(task);

    return task;
  }

  removeTask(task) {
    const index = this.#tasks.indexOf(task);
    this.#tasks.splice(index, 1);
  }

  connectToDisplay(task, taskDisplay) {
    task.attach(taskDisplay);
  }
}

export { TaskManager };
