class TaskModal {
  constructor(buildDatePicker) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const form = document.createElement('form');
    form.classList.add('create-task');
    form.autocomplete = 'off';

    const taskName = document.createElement('input');
    taskName.type = 'text';
    taskName.name = 'task-name';
    taskName.id = 'task-name';
    taskName.placeholder = 'Task Name';

    const description = document.createElement('input');
    description.type = 'text';
    description.name = 'description';
    description.id = 'description';
    description.placeholder = 'Description';

    const dateTime = buildDatePicker();
    dateTime.id = 'date-time';

    const project = document.createElement('select');
    project.name = 'project';
    project.id = 'select-project';

    const defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    defaultOption.textContent = 'Project';
    defaultOption.selected = true;
    defaultOption.disabled = true;

    project.appendChild(defaultOption);

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.id = 'cancel';
    cancel.textContent = 'Cancel';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.id = 'submit';
    submit.textContent = 'Submit';
    submit.disabled = true;

    buttons.appendChild(cancel);
    buttons.appendChild(submit);

    form.appendChild(taskName);
    form.appendChild(description);
    form.appendChild(dateTime);
    form.appendChild(project);
    form.appendChild(buttons);

    modalOverlay.appendChild(form);

    this.overlay = modalOverlay;
    this.modal = form;
    this.taskName = taskName;
    this.submit = submit;
    this.cancel = cancel;
  }

  requireTaskName() {
    this.taskName.focus();
    this.taskName.addEventListener('input', () => {
      if (this.taskName.value !== '') {
        submit.disabled = false;
      } else {
        submit.disabled = true;
      }
    });
  }
}

export { TaskModal };
