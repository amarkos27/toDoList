class TaskDisplayController {
  #items;

  constructor(items) {
    this.#items = items;
  }
  createTaskDisplay(task) {
    const taskDisplay = document.createElement('div');
    taskDisplay.classList.add('task');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    const completedIndicator = document.createElement('div');
    completedIndicator.classList.add('completed-indicator');

    checkbox.appendChild(completedIndicator);

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskName = document.createElement('p');
    taskName.classList.add('task-name');
    taskName.textContent = task.taskName;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = task.description;

    const dateAndTime = document.createElement('p');
    dateAndTime.classList.add('date-and-time');
    dateAndTime.textContent = task.dateTime;

    taskInfo.appendChild(taskName);
    taskInfo.appendChild(description);
    taskInfo.appendChild(dateAndTime);

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const actionButtons = {};

    const editBtn = document.createElement('div');
    editBtn.classList.add('edit');

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete');

    actionButtons.checkbox = checkbox;
    actionButtons.edit = editBtn;
    actionButtons.delete = deleteBtn;

    actions.appendChild(actionButtons.edit);
    actions.appendChild(actionButtons.delete);

    taskDisplay.appendChild(checkbox);
    taskDisplay.appendChild(taskInfo);
    taskDisplay.appendChild(actions);

    return { taskDisplay, actionButtons };
  }

  addTaskDisplay(taskDisplay) {
    this.#items.appendChild(taskDisplay);
  }

  insertTaskDisplay(taskDisplay, previous) {
    this.#items.insertBefore(taskDisplay, previous);
  }

  removeTaskDisplay(taskDisplay) {
    this.#items.removeChild(taskDisplay);
  }

  addEditPane(taskDisplay, task) {
    const editPane = document.createElement('form');
    editPane.classList.add('edit-pane');

    const editName = document.createElement('input');
    editName.type = 'text';
    editName.name = 'task-name';
    editName.classList.add('edit-name');
    editName.placeholder = 'Task Name';
    editName.value = task.taskName;

    const editDescription = document.createElement('input');
    editDescription.type = 'text';
    editDescription.name = 'description';
    editDescription.classList.add('edit-description');
    editDescription.placeholder = 'Description';
    editDescription.value = task.description;

    const editDate = document.createElement('input');
    editDate.type = 'datetime-local';
    editDate.name = 'date-and-time';
    editDate.classList.add('edit-date');
    editDate.value = task.dateTime;

    const editProject = document.createElement('select');
    editProject.classList.add('edit-project');
    editProject.name = 'project';

    const defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    defaultOption.textContent = 'Project';
    defaultOption.selected = true;
    defaultOption.disabled = true;

    const buttons = document.createElement('div');
    buttons.classList.add('edit-buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.id = 'cancel-edit';
    cancel.textContent = 'Cancel';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.id = 'submit-edit';
    submit.textContent = 'Submit';

    buttons.appendChild(cancel);
    buttons.appendChild(submit);

    editProject.appendChild(defaultOption);

    editPane.appendChild(editName);
    editPane.appendChild(editDescription);
    editPane.appendChild(editDate);
    editPane.appendChild(editProject);
    editPane.appendChild(buttons);

    this.#items.insertBefore(editPane, taskDisplay);

    return editPane;
  }

  removeEditPane(editPane) {
    this.#items.removeChild(editPane);
  }
}

export { TaskDisplayController };
