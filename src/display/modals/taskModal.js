class TaskModal {
  constructor(buildDatePicker, requireInput, fillProjects) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const form = document.createElement('form');
    form.classList.add('create-task', 'modal');
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

    project.appendChild(defaultOption);

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.id = 'cancel';
    cancel.classList.add('cancel');
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
    this.project = project;
    this.submit = submit;
    this.cancel = cancel;
    this.requireInput = requireInput;
    this.fillProjects = fillProjects;
  }
}

export { TaskModal };
