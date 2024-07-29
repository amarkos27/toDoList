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
  if (sidebarController.overlay) {
    sidebarController.toggleSidebarWithOverlay();
  }
  display.openModal();
}
