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
    const form = this.modalController.openModal();

    return form;
  }

  closeModal() {
    this.modalController.closeModal();
  }
}

let display;

export function displayInit() {
  const sidebarController = new SidebarController();
  const modalController = new ModalController();

  display = new DisplayController(sidebarController, modalController);
  display.initialize();
}

export function displayForm() {
  const form = display.openModal();

  return form;
}

export function closeForm() {
  display.closeModal();
}
