import { ConfirmModal } from './modals/confirmModal.js';
import { TaskModal } from './modals/taskModal.js';
import { ProjectModal } from './modals/projectModal.js';
class ModalController {
  #windowClick;
  #items;
  #alreadyOpen;

  constructor(items, buildDatePicker, fillProjects) {
    this.#items = items;
    this.buildDatePicker = buildDatePicker;
    this.fillProjects = fillProjects;
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

    window.addEventListener('mousedown', windowClick);
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

  newTaskModal(projects, activeFilter) {
    const form = new TaskModal(
      this.buildDatePicker,
      this.requireInput,
      this.fillProjects
    );

    let filter;
    if (activeFilter) {
      filter = activeFilter.textContent;
    } else {
      filter = null;
    }

    form.fillProjects(projects, filter);
    this.initializeModal(form);

    return form;
  }

  newProjectModal(existingProject) {
    const projectModal = new ProjectModal(this.requireInput);
    // If this function is passed an existing project (from the edit function in app.js),
    // set the input value to that project name
    if (existingProject) {
      projectModal.modal.firstChild.value = existingProject;
      projectModal.submit.disabled = false;
    }

    this.initializeModal(projectModal);

    return projectModal;
  }

  initializeModal(modal) {
    this.#modalListeners(modal);
    this.#items.appendChild(modal.overlay);
    modal.requireInput();
    this.#alreadyOpen = modal;
  }

  closeModal(modal) {
    modal.modal.classList.add('close-modal');
    modal.modal.addEventListener('animationend', () => {
      this.#items.removeChild(modal.overlay);
    });
    window.removeEventListener('mousedown', this.#windowClick);
    this.#alreadyOpen = null;
  }

  createCancelModal() {
    const header = 'Discard Changes?';
    const description = 'No changes will be saved.';
    const confirmText = 'Discard';

    const cancelModal = new ConfirmModal(
      header,
      description,
      confirmText,
      this.closeConfirmModal
    );
    cancelModal.confirmOverlay.classList.add('cancel-modal');
    this.#items.appendChild(cancelModal.confirmOverlay);

    return cancelModal;
  }

  createDeleteModal(projectName) {
    const header = `Are you sure you want to delete #${projectName}?`;
    const description = 'All tasks within this project will be deleted.';
    const confirmText = 'Delete';

    const deleteModal = new ConfirmModal(
      header,
      description,
      confirmText,
      this.closeConfirmModal
    );
    deleteModal.confirmOverlay.classList.add('delete-modal');
    this.#items.appendChild(deleteModal.confirmOverlay);

    return deleteModal;
  }

  createConfirmEditProject(oldProjectName, newProjectName) {
    const header = `Are you sure you would like to change #${oldProjectName} to #${newProjectName}?`;
    const description = 'All tasks within this project will be changed.';
    const confirmText = 'Confirm';

    const confirmEditProjectModal = new ConfirmModal(
      header,
      description,
      confirmText,
      this.closeConfirmModal
    );
    this.#items.appendChild(confirmEditProjectModal.confirmOverlay);

    return confirmEditProjectModal;
  }

  closeConfirmModal = (overlay) => {
    this.#items.removeChild(overlay);
  };
}

export { ModalController };
