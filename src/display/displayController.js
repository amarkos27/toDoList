import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';
import { TaskDisplayController } from './taskDisplay.js';

class DisplayController {
  #items = document.querySelector('.items');
  #content = document.querySelector('#content');

  constructor() {
    this.sidebarController = new SidebarController(this.#content);
    this.modalController = new ModalController(
      this.#content,
      this.buildDatePicker,
      this.fillProjects
    );
    this.taskDisplayController = new TaskDisplayController(
      this.#items,
      this.buildDatePicker
    );
  }

  initialize() {
    this.sidebarController.initialize();
  }

  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // These two methods must be arrow functions to prevent "this" from being lost in
  // the two classes that receive them
  onInvalidDate = (e) => {
    const datePicker = e.currentTarget;
    const currentDate = this.getCurrentDateTime();
    if (datePicker.value) {
      if (datePicker.value < currentDate) {
        datePicker.setCustomValidity(
          `Please enter date and time after ${currentDate
            .split('T')
            .join(' ')}.`
        );
      }
    } else {
      datePicker.setCustomValidity('Please enter date and time.');
    }
  };

  onValidDate(e) {
    e.currentTarget.setCustomValidity('');
  }

  buildDatePicker = () => {
    const dateTime = document.createElement('input');
    dateTime.type = 'datetime-local';
    dateTime.name = 'date-and-time';
    dateTime.min = this.getCurrentDateTime();
    dateTime.oninvalid = this.onInvalidDate;
    dateTime.oninput = this.onValidDate;

    return dateTime;
  };

  fillProjects(projects, existingTask = null) {
    const modal = this;
    projects.forEach((project) => {
      const newOption = document.createElement('option');
      newOption.textContent = project;
      newOption.value = project;

      if (existingTask && existingTask.project === project) {
        newOption.selected = true;
      }

      modal.project.appendChild(newOption);
    });
  }

  newTaskModal(projects) {
    if (this.sidebarController.overlay) {
      this.sidebarController.toggleSidebarWithOverlay();
    }
    this.modalController.closeExistingModal();

    const form = this.modalController.newTaskModal(projects);

    return form;
  }

  newProjectModal() {
    if (this.sidebarController.overlay) {
      this.sidebarController.toggleSidebarWithOverlay();
    }
    this.modalController.closeExistingModal();

    const projectModal = this.modalController.newProjectModal();

    return projectModal;
  }

  closeModal(modal) {
    this.modalController.closeModal(modal);
  }

  addProject(projectDisplay) {
    this.sidebarController.addProject(projectDisplay);
  }

  removeProject(projectDisplay) {
    this.sidebarController.removeProject(projectDisplay);
  }

  createNewTaskDisplay(task) {
    const { taskDisplay, actionButtons } =
      this.taskDisplayController.createTaskDisplay(task);
    this.taskDisplayController.addTaskDisplay(taskDisplay);

    return { taskDisplay, actionButtons };
  }

  removeTaskDisplay(taskDisplay) {
    this.taskDisplayController.removeTaskDisplay(taskDisplay);
  }

  editTask(task, projects) {
    const editPane = this.taskDisplayController.addEditPane(
      task,
      this.fillProjects
    );
    editPane.fillProjects(projects, task);
    this.taskDisplayController.removeTaskDisplay(task.display);

    return editPane;
  }

  isTaskDisplayed(taskDisplay) {
    if (this.#items.contains(taskDisplay)) {
      return true;
    } else return false;
  }

  closeEdit(taskDisplay, editPane) {
    this.taskDisplayController.insertTaskDisplay(taskDisplay, editPane);
    this.taskDisplayController.removeEditPane(editPane);
  }

  confirmCancel() {
    const cancelModal = this.modalController.createCancelModal();

    return cancelModal;
  }

  closeConfirmModal(overlay) {
    this.modalController.closeConfirmModal(overlay);
  }

  confirmDelete(projectName) {
    const deleteModal = this.modalController.createDeleteModal(projectName);

    return deleteModal;
  }
}

export { DisplayController };
