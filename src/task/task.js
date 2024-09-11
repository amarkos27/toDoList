class Task {
  constructor(values) {
    this.taskName = values.taskName;
    this.description = values.description;
    this.dateTime = values.dateTime.split('T').join(' ');
    this.project = values.project;
  }
}

export { Task };
