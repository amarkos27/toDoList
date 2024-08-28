import { CancelModal } from './confirmCancelModal.js';
import { TaskModal } from './taskModal.js';
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

  closeExistingModal() {
    if (this.#alreadyOpen) {
      this.closeModal(this.#alreadyOpen);
    }
  }

  newTaskModal() {
    const form = new TaskModal(this.buildDatePicker);
    this.#modalListeners(form);
    this.#items.appendChild(form.overlay);
    form.requireTaskName();
    this.#alreadyOpen = form;

    return form;
  }

  closeModal(modal) {
    console.log(modal);
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
