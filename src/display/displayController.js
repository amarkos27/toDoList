import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';

class DisplayController {
  constructor(sidebarController, modalController) {
    this.sidebarController = sidebarController;
    this.modalController = modalController;
  }

  initialize() {
    this.sidebarController.set_up_listeners();
  }

  open_modal() {
    this.modalController.open_modal();
  }
}

const sidebarController = new SidebarController();
const modalController = new ModalController();
const display = new DisplayController(sidebarController, modalController);

export function display_init() {
  display.initialize();
}

export function display_form() {
  display.open_modal();
}
