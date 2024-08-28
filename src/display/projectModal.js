class ProjectModal {
  constructor() {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    const projectModal = document.createElement('div');
    projectModal.classList.add('new-project', 'modal');

    const projectName = document.createElement('input');
    projectName.classList.add('project-name');
    projectName.type = 'text';
    projectName.placeholder = 'Project Name';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancel';
    cancel.classList.add('cancel');

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.textContent = 'Submit';
    submit.classList.add('submit');

    buttonsDiv.appendChild(cancel);
    buttonsDiv.appendChild(submit);

    projectModal.appendChild(projectName);
    projectModal.appendChild(buttonsDiv);

    modalOverlay.appendChild(projectModal);

    this.projectName = projectName;
    this.overlay = modalOverlay;
    this.modal = projectModal;
    this.cancel = cancel;
    this.submit = submit;
  }
}

export { ProjectModal };
