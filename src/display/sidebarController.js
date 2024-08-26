class SidebarController {
  #sidebarWrapper = document.querySelector('.sidebar-wrapper');
  #sidebarBtn = document.querySelector('.sidebar-btn');
  #triggerResizeEvent = null;
  #content;

  constructor(content) {
    this.#content = content;
  }

  get #windowSmall() {
    return window.innerWidth < 1100;
  }

  get #sidebarClosed() {
    return this.#sidebarWrapper.classList.contains('sidebar-closed');
  }

  get overlay() {
    return document.querySelector('.sidebar-overlay');
  }

  #toggleSidebar(btnPress = false) {
    this.#sidebarWrapper.classList.toggle('sidebar-closed');

    if (btnPress && this.#sidebarClosed) {
      this.#sidebarWrapper.classList.add('toggled-off');
    } else {
      this.#sidebarWrapper.classList.remove('toggled-off');
    }
  }

  #toggleBtn() {
    if (this.#sidebarClosed) {
      this.#sidebarBtn.classList.add('standAlone');
    } else {
      this.#sidebarBtn.classList.remove('standAlone');
    }
  }

  #toggleOverlay() {
    if (this.overlay.classList.contains('show')) {
      this.#sidebarWrapper.addEventListener(
        'transitionend',
        () => {
          // There needs to be a check for the existence of the overlay in case the user stretches
          // the screen and it is removed before transitionend, which would cause an error on
          // accessing its classList
          if (this.overlay) {
            this.overlay.classList.remove('show');
          }
        },
        { once: true }
      );
    } else {
      this.overlay.classList.add('show');
    }
  }

  #btnClickHandler() {
    if (this.overlay) {
      this.toggleSidebarWithOverlay();
    } else {
      this.toggleSidebarWithoutOverlay();
    }
  }

  #createSidebarOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    overlay.appendChild(this.#sidebarWrapper);
    this.#content.insertBefore(overlay, this.#content.firstChild);
  }

  #removeSidebarOverlay() {
    this.#content.removeChild(this.overlay);
    this.#content.insertBefore(this.#sidebarWrapper, this.#content.firstChild);
  }

  #resizeToggle() {
    const toggledOff = this.#sidebarWrapper.classList.contains('toggled-off');

    if (this.#windowSmall && !this.#sidebarClosed) {
      if (this.overlay) {
        this.#toggleOverlay();
      }
      this.#sidebarWrapper.classList.add('sidebar-closed');
      this.#toggleBtn();
    } else if (!this.#windowSmall && !toggledOff && this.#sidebarClosed) {
      // Create delay from the DOM manipulation so the CSS transitions are shown
      setTimeout(() => {
        this.#sidebarWrapper.classList.remove('sidebar-closed');
        this.#toggleBtn();
      }, 1);
    }
  }

  #resizeHandler() {
    if (!this.#windowSmall && this.overlay) {
      this.#removeSidebarOverlay();
    }

    this.#resizeToggle();

    // Only create the sidebar overlay when the user is DONE resizing the screen
    clearTimeout(this.#triggerResizeEvent);
    this.#triggerResizeEvent = setTimeout(() => {
      if (this.#windowSmall && this.#sidebarClosed && !this.overlay) {
        this.#createSidebarOverlay();
      }
    }, 200);
  }

  toggleSidebarWithoutOverlay() {
    this.#toggleSidebar(true);
    this.#toggleBtn();
  }

  toggleSidebarWithOverlay() {
    this.#toggleOverlay();
    this.#toggleSidebar();
    this.#toggleBtn();
  }

  setUpListeners() {
    this.#sidebarBtn.addEventListener('click', (e) => {
      // Stops event from propagating to inner icon div
      e.stopPropagation();
      this.#btnClickHandler();
    });

    window.addEventListener('resize', () => {
      this.#resizeHandler();
    });
  }
}

export { SidebarController };
