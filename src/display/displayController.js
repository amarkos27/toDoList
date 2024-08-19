import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';

class DisplayController {
  #items = document.querySelector('.items');

  constructor() {
    this.sidebarController = new SidebarController();
    this.modalController = new ModalController();
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

  createTaskDisplay(task) {
    const taskDisplay = document.createElement('div');
    taskDisplay.classList.add('task');

    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    const completedIndicator = document.createElement('div');
    completedIndicator.classList.add('completed-indicator');

    checkbox.appendChild(completedIndicator);

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskName = document.createElement('p');
    taskName.classList.add('task-name');
    taskName.textContent = task.taskName;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = task.description;

    const dateAndTime = document.createElement('p');
    dateAndTime.classList.add('date-and-time');
    dateAndTime.textContent = task.dateTime;

    taskInfo.appendChild(taskName);
    taskInfo.appendChild(description);
    taskInfo.appendChild(dateAndTime);

    const actions = {};

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    actions.delete = deleteBtn;

    taskDisplay.appendChild(checkbox);
    taskDisplay.appendChild(taskInfo);
    for (let action in actions) {
      taskDisplay.appendChild(actions[action]);
    }

    this.#items.appendChild(taskDisplay);

    return { taskDisplay, actions };
  }

  removeTaskDisplay(taskDisplay) {
    this.#items.removeChild(taskDisplay);
  }
}

export { DisplayController };
