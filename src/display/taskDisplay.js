class TaskDisplayController {
  #windowClick;

  constructor(buildDatePicker) {
    this.buildDatePicker = buildDatePicker;
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

    if (task.taskName) {
      const taskName = document.createElement('p');
      taskName.classList.add('task-name');
      taskName.textContent = task.taskName;

      taskInfo.appendChild(taskName);
    }

    if (task.description) {
      const description = document.createElement('p');
      description.classList.add('description', 'task-detail');
      description.textContent = task.description;

      taskInfo.appendChild(description);
    }

    if (task.dateTime) {
      const dateAndTime = document.createElement('p');
      dateAndTime.classList.add('date-and-time', 'task-detail');
      dateAndTime.textContent = new Date(task.dateTime).toLocaleString(
        'en-US',
        {
          day: 'numeric',
          year: 'numeric',
          month: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      );
      taskInfo.appendChild(dateAndTime);
    }

    if (task.project !== 'default') {
      const project = document.createElement('p');
      project.classList.add('task-project', 'task-detail');
      project.textContent = `#${task.project}`;
      taskInfo.appendChild(project);
    }

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

  insertTaskDisplay(taskDisplay, previous) {
    previous.parentNode.insertBefore(taskDisplay, previous);
  }

  removeTaskDisplay(taskDisplay) {
    taskDisplay.remove();
  }

  addEditPane(task, fillProjects) {
    const editPane = document.createElement('form');
    editPane.classList.add('edit-pane', 'modal');
    editPane.autocomplete = 'off';

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

    const editDate = this.buildDatePicker();
    editDate.classList.add('edit-date');
    editDate.value = task.dateTime;

    const editProject = document.createElement('select');
    editProject.classList.add('edit-project');
    editProject.name = 'project';

    const defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    defaultOption.textContent = 'Project';
    defaultOption.selected = true;

    const buttons = document.createElement('div');
    buttons.classList.add('edit-buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.id = 'cancel-edit';
    cancel.classList.add('cancel');
    cancel.textContent = 'Cancel';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.id = 'submit-edit';
    submit.classList.add('submit');
    submit.textContent = 'Submit';

    buttons.appendChild(cancel);
    buttons.appendChild(submit);

    editProject.appendChild(defaultOption);

    editPane.appendChild(editName);
    editPane.appendChild(editDescription);
    editPane.appendChild(editDate);
    editPane.appendChild(editProject);
    editPane.appendChild(buttons);

    task.display.parentNode.insertBefore(editPane, task.display);
    this.closeEditIfOutsideClick(editPane, task.display);

    return {
      modal: editPane,
      project: editProject,
      cancel: cancel,
      submit: submit,
      fillProjects: fillProjects,
    };
  }

  removeEditPane(editPane) {
    editPane.remove();
  }

  closeEditIfOutsideClick(editPane, taskDisplay) {
    const callback = (e) => {
      if (
        !editPane.contains(e.target) &&
        !e.target.closest('.confirm-overlay')
      ) {
        this.closeEdit(taskDisplay, editPane);
      }
    };

    window.addEventListener('mousedown', callback);
    this.#windowClick = callback;
  }

  closeEdit(taskDisplay, editPane) {
    this.insertTaskDisplay(taskDisplay, editPane);
    this.removeEditPane(editPane);

    window.removeEventListener('mousedown', this.#windowClick);
  }
}

export { TaskDisplayController };
