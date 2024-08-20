class Task {
  constructor(values) {
    this.taskName = values.taskName;
    this.description = values.description;
    this.dateTime = values.dateTime;
    this.project = values.project;
  }

  attach(taskDisplay) {
    this.display = taskDisplay;
  }
}

export { Task };
