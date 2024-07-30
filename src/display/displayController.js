import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';

class DisplayController {
  constructor(sidebarController, modalController) {
    this.sidebarController = sidebarController;
    this.modalController = modalController;
  }

  initialize() {
    this.sidebarController.setUpListeners();
  }

  openModal() {
    if (this.sidebarController.overlay) {
      this.sidebarController.toggleSidebarWithOverlay();
    }
    this.modalController.openModal();
  }
}

const sidebarController = new SidebarController();
let modalController;
let display;

export function displayInit(createTask) {
  modalController = new ModalController(createTask);
  display = new DisplayController(sidebarController, modalController);
  display.initialize();
}

export function displayForm() {
  display.openModal();
}
