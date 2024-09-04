import { ConfirmModal } from './confirmModal.js';
import { TaskModal } from './modals/taskModal.js';
import { ProjectModal } from './modals/projectModal.js';
class ModalController {
  #windowClick;
  #items = document.querySelector('.items');
  #content;
  #alreadyOpen;

  constructor(content, buildDatePicker, fillProjects) {
    this.#content = content;
    this.buildDatePicker = buildDatePicker;
    this.fillProjects = fillProjects;
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
    const input = this.modal.firstChild;
    input.focus();
    input.addEventListener('input', () => {
      const validInput = /\S+/;
      if (input.value.match(validInput)) {
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

  newTaskModal(projects) {
    const form = new TaskModal(
      this.buildDatePicker,
      this.requireInput,
      this.fillProjects
    );

    form.fillProjects(projects);
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
    const header = 'Discard Changes?';
    const description = 'No changes will be saved.';
    const confirmText = 'Discard';

    const cancelModal = new ConfirmModal(header, description, confirmText);
    this.#content.appendChild(cancelModal.confirmOverlay);

    return cancelModal;
  }

  createDeleteModal(projectName) {
    const header = `Are you sure you want to delete #${projectName}?`;
    const description = 'All tasks within this project will be deleted.';
    const confirmText = 'Delete';

    const deleteModal = new ConfirmModal(header, description, confirmText);
    this.#content.appendChild(deleteModal.confirmOverlay);

    return deleteModal;
  }

  closeConfirmModal(overlay) {
    this.#content.removeChild(overlay);
  }
}

export { ModalController };
