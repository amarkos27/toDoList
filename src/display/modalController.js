class ModalController {
  #items = document.querySelector('.items');

  get #modalOverlay() {
    return document.querySelector('.form-overlay');
  }

  get #modal() {
    return document.querySelector('.create-task');
  }

  get formAlreadyOpen() {
    return !!document.querySelector('.form-overlay');
  }

  #createModal() {
    const form = document.createElement('form');
    form.classList.add('create-task');

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

    const dateTime = document.createElement('input');
    dateTime.type = 'datetime-local';
    dateTime.name = 'date-and-time';
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
    submit.type = 'button';
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

    return form;
  }

  #focusModal() {
    this.#modal.firstChild.focus();
  }

  #closeModal() {
    this.#modal.classList.add('close-modal');
    this.#modal.addEventListener('animationend', () => {
      this.#items.removeChild(this.#modalOverlay);
    });
  }

  #modalListeners() {
    const cancel = document.querySelector('#cancel');
    const windowClick = (e) => {
      if (!this.#modal.contains(e.target) || e.target === cancel) {
        this.#closeModal();
        window.removeEventListener('click', windowClick);
      }
    };

    window.addEventListener('click', windowClick);
  }

  openModal() {
    if (!this.#modalOverlay) {
      const formOverlay = document.createElement('div');
      formOverlay.classList.add('form-overlay');

      const modal = this.#createModal();
      formOverlay.appendChild(modal);
      this.#items.appendChild(formOverlay);
      this.#focusModal();

      this.#modalListeners();
    }
  }
}

export { ModalController };
