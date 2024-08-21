import { Task } from './task.js';
class TaskManager {
  #tasks = [];

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

    console.log(this.#tasks);

    return newTask;
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
