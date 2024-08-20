import { Task } from './task.js';
class TaskManager {
  #tasks = [];

  createTask(values) {
    const task = new Task(values);
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
