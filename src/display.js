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

  #toggle_sidebar() {
    this.#sidebar_wrapper.classList.toggle('sidebar-closed');

    if (!this.#sidebarClosed) {
      this.#sidebar_wrapper.classList.add('toggled-off');
    } else {
      this.#sidebar_wrapper.classList.remove('toggled-off');
    }
  }

  #toggle_btn() {
    if (this.#sidebar_wrapper.classList.contains('sidebar-closed')) {
      this.#sidebar_btn.classList.add('standAlone');
    } else {
      this.#sidebar_btn.classList.remove('standAlone');
    }
  }

  #create_sidebar_overlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    overlay.appendChild(this.#sidebar_wrapper);
    this.#content.insertBefore(overlay, this.#content.firstChild);
  }

  #remove_sidebar_overlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    this.#content.removeChild(overlay);
    this.#content.insertBefore(this.#sidebar_wrapper, this.#content.firstChild);
  }

  #resize_toggle() {
    const toggledOff = this.#sidebar_wrapper.classList.contains('toggled-off');

    if (this.#windowSmall && !this.#sidebarClosed) {
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
    const isOverlay =
      this.#sidebar_wrapper.parentNode.classList.contains('sidebar-overlay');

    if (!this.#windowSmall && isOverlay) {
      this.#remove_sidebar_overlay();
    }

    this.#resize_toggle();

    // Only create the sidebar overlay when the user is DONE resizing the screen
    clearTimeout(this.#trigger_resize_event);
    this.#trigger_resize_event = setTimeout(() => {
      if (this.#windowSmall && this.#sidebarClosed && !isOverlay) {
        this.#create_sidebar_overlay();
      }
    }, 200);
  }

  set_up_listeners() {
    this.#sidebar_btn.addEventListener('click', () => {
      this.#toggle_sidebar();
      this.#toggle_btn();
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
