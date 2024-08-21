import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';
import { TaskDisplayController } from './taskDisplay.js';

class DisplayController {
  #items = document.querySelector('.items');

  constructor() {
    this.sidebarController = new SidebarController();
    this.modalController = new ModalController();
    this.taskDisplayController = new TaskDisplayController(this.#items);
  }

  initialize() {
    this.sidebarController.setUpListeners();
  }

  openModal() {
    if (this.sidebarController.overlay) {
      this.sidebarController.toggleSidebarWithOverlay();
    }
    const form = this.modalController.openModal();

    return form;
  }

  closeModal() {
    this.modalController.closeModal();
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

  editTask(taskDisplay, task) {
    const editPane = this.taskDisplayController.addEditPane(taskDisplay, task);
    this.taskDisplayController.removeTaskDisplay(taskDisplay);

    return editPane;
  }

  closeEdit(taskDisplay, editPane) {
    this.taskDisplayController.insertTaskDisplay(taskDisplay, editPane);
    this.taskDisplayController.removeEditPane(editPane);
  }
}

export { DisplayController };
