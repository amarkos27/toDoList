class DisplayController {
  #sidebar_wrapper = document.querySelector('.sidebar-wrapper');
  #sidebar_btn = document.querySelector('.sidebar-btn');
  #content = document.querySelector('#content');
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

  set_up_listeners() {
    this.#sidebar_btn.addEventListener('click', () => {
      this.#btn_click_handler();
    });

    window.addEventListener('resize', () => {
      this.#resize_handler();
    });
  }
}

export function display_init() {
  const display = new DisplayController();

  display.set_up_listeners();
}

export function open_modal() {}
