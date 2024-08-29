import { CancelModal } from './confirmCancelModal.js';
import { TaskModal } from './taskModal.js';
import { ProjectModal } from './projectModal.js';
class ModalController {
  #windowClick;
  #items = document.querySelector('.items');
  #content;
  #alreadyOpen;

  constructor(content, buildDatePicker) {
    this.#content = content;
    this.buildDatePicker = buildDatePicker;
  }

  get formAlreadyOpen() {
    return !!document.querySelector('.form-overlay');
  }

  #modalListeners(modal) {
    const cancel = modal.cancel;
    const windowClick = (e) => {
      if (
        (!modal.modal.contains(e.target) &&
          !e.target.classList.contains('sidebar-btn')) ||
        e.target === cancel
      ) {
        this.closeModal(modal);
      }
    };

    // Store reference to function for event listener removal
    this.#windowClick = windowClick;

    window.addEventListener('click', windowClick);
  }

  requireInput() {
    console.log(this.submit);
    const input = this.modal.firstChild;
    input.focus();
    input.addEventListener('input', () => {
      if (input.value !== '') {
        this.submit.disabled = false;
      } else {
        this.submit.disabled = true;
      }
    });
  }

  closeExistingModal() {
    if (this.#alreadyOpen) {
      this.closeModal(this.#alreadyOpen);
    }
  }

  newTaskModal() {
    const form = new TaskModal(this.buildDatePicker, this.requireInput);

    this.#modalListeners(form);
    this.#items.appendChild(form.overlay);
    form.requireInput();
    this.#alreadyOpen = form;

    return form;
  }

  newProjectModal() {
    const projectModal = new ProjectModal(this.requireInput);
    this.#modalListeners(projectModal);
    this.#items.appendChild(projectModal.overlay);
    projectModal.requireInput();
    this.#alreadyOpen = projectModal;

    return projectModal;
  }

  closeModal(modal) {
    modal.modal.classList.add('close-modal');
    modal.modal.addEventListener('animationend', () => {
      this.#items.removeChild(modal.overlay);
    });
    window.removeEventListener('click', this.#windowClick);
  }

  createCancelModal() {
    const cancelModal = new CancelModal();
    this.#content.appendChild(cancelModal.cancelOverlay);

    return cancelModal;
  }

  closeCancelModal(cancelOverlay) {
    this.#content.removeChild(cancelOverlay);
  }
}

export { ModalController };
