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
const modalController = new ModalController();
const display = new DisplayController(sidebarController, modalController);

export function displayInit() {
  display.initialize();
}

export function displayForm() {
  display.openModal();
}
