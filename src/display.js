class DisplayController {
  #sidebar_wrapper = document.querySelector('.sidebar-wrapper');
  #sidebar_btn = document.querySelector('.sidebar-btn');
  #content = document.querySelector('#content');
  #items = document.querySelector('.items');
  #trigger_resize_event = null;

  get #windowSmall() {
    return window.innerWidth < 1100;
  }

  get #sidebarClosed() {
    return this.#sidebar_wrapper.classList.contains('sidebar-closed');
  }

  get #overlay() {
    return document.querySelector('.sidebar-overlay');
  }

  get #modal_overlay() {
    return document.querySelector('.form-overlay');
  }

  get #modal() {
    return document.querySelector('.create-task');
  }

  get formAlreadyOpen() {
    return !!document.querySelector('.form-overlay');
  }

  #toggle_sidebar(btnPress = false) {
    this.#sidebar_wrapper.classList.toggle('sidebar-closed');

    if (btnPress && this.#sidebarClosed) {
      this.#sidebar_wrapper.classList.add('toggled-off');
    } else {
      this.#sidebar_wrapper.classList.remove('toggled-off');
    }
  }

  #toggle_btn() {
    if (this.#sidebarClosed) {
      this.#sidebar_btn.classList.add('standAlone');
    } else {
      this.#sidebar_btn.classList.remove('standAlone');
    }
  }

  #toggle_overlay() {
    if (this.#overlay.classList.contains('show')) {
      this.#sidebar_wrapper.addEventListener(
        'transitionend',
        () => {
          // There needs to be a check for the existence of the overlay in case the user stretches
          // the screen and it is removed before transitionend, which would cause an error on
          // accessing its classList
          if (this.#overlay) {
            this.#overlay.classList.remove('show');
          }
        },
        { once: true }
      );
    } else {
      this.#overlay.classList.add('show');
    }
  }

  #btn_click_handler() {
    if (this.#overlay) {
      this.#toggle_overlay();
      this.#toggle_sidebar();
      this.#toggle_btn();
    } else {
      this.#toggle_sidebar(true);
      this.#toggle_btn();
    }
  }

  #create_sidebar_overlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    overlay.appendChild(this.#sidebar_wrapper);
    this.#content.insertBefore(overlay, this.#content.firstChild);
  }

  #remove_sidebar_overlay() {
    this.#content.removeChild(this.#overlay);
    this.#content.insertBefore(this.#sidebar_wrapper, this.#content.firstChild);
  }

  #resize_toggle() {
    const toggledOff = this.#sidebar_wrapper.classList.contains('toggled-off');

    if (this.#windowSmall && !this.#sidebarClosed) {
      if (this.#overlay) {
        this.#toggle_overlay();
      }
      this.#sidebar_wrapper.classList.add('sidebar-closed');
      this.#toggle_btn();
    } else if (!this.#windowSmall && !toggledOff && this.#sidebarClosed) {
      // Create delay from the DOM manipulation so the CSS transitions are shown
      setTimeout(() => {
        this.#sidebar_wrapper.classList.remove('sidebar-closed');
        this.#toggle_btn();
      }, 1);
    }
  }

  #resize_handler() {
    if (!this.#windowSmall && this.#overlay) {
      this.#remove_sidebar_overlay();
    }

    this.#resize_toggle();

    // Only create the sidebar overlay when the user is DONE resizing the screen
    clearTimeout(this.#trigger_resize_event);
    this.#trigger_resize_event = setTimeout(() => {
      if (this.#windowSmall && this.#sidebarClosed && !this.#overlay) {
        this.#create_sidebar_overlay();
      }
    }, 200);
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

  set_up_listeners() {
    this.#sidebar_btn.addEventListener('click', () => {
      this.#btn_click_handler();
    });

    window.addEventListener('resize', () => {
      this.#resize_handler();
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

const display = new DisplayController();

export function display_init() {
  display.set_up_listeners();
}

export function display_new_task() {
  if (!display.formAlreadyOpen) {
    display.open_modal();
  }
}
