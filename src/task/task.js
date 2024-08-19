class Task {
  constructor(form, taskDisplay) {
    this.taskName = form.querySelector('#task-name').value;
    this.description = form.querySelector('#description').value;
    this.dateTime = form.querySelector('#date-time').value;
    this.project = form.querySelector('#select-project').value;
    this.display = taskDisplay;
  }

  attach(taskDisplay) {
    this.taskDisplay = taskDisplay;
  }
}

export { Task };
