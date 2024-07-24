class ModalController {
  #items = document.querySelector('.items');

  get #modal_overlay() {
    return document.querySelector('.form-overlay');
  }

  get #modal() {
    return document.querySelector('.create-task');
  }

  get formAlreadyOpen() {
    return !!document.querySelector('.form-overlay');
  }

  #create_modal() {
    const form = document.createElement('form');
    form.classList.add('create-task');

    const task_name = document.createElement('input');
    task_name.type = 'text';
    task_name.name = 'task-name';
    task_name.id = 'task-name';
    task_name.placeholder = 'Task Name';

    const description = document.createElement('input');
    description.type = 'text';
    description.name = 'description';
    description.id = 'description';
    description.placeholder = 'Description';

    const date_time = document.createElement('input');
    date_time.type = 'datetime-local';
    date_time.name = 'date-and-time';
    date_time.id = 'date-time';

    const project = document.createElement('select');
    project.name = 'project';
    project.id = 'select-project';

    const default_option = document.createElement('option');
    default_option.value = 'default';
    default_option.textContent = 'Project';
    default_option.selected = true;
    default_option.disabled = true;

    project.appendChild(default_option);

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

    form.appendChild(task_name);
    form.appendChild(description);
    form.appendChild(date_time);
    form.appendChild(project);
    form.appendChild(buttons);

    return form;
  }

  #close_modal() {
    this.#modal.classList.add('close-modal');
    this.#modal.addEventListener('animationend', () => {
      this.#items.removeChild(this.#modal_overlay);
    });
  }

  #modal_listeners() {
    const cancel = document.querySelector('#cancel');

    this.#modal_overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target === cancel) {
        this.#close_modal();
      }
    });
  }

  open_modal() {
    if (!this.#modal_overlay) {
      const form_overlay = document.createElement('div');
      form_overlay.classList.add('form-overlay');

      const modal = this.#create_modal();

      form_overlay.appendChild(modal);

      this.#items.appendChild(form_overlay);

      this.#modal_listeners();
    }
  }
}

export { ModalController };
