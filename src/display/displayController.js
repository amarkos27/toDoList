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

    const actions = document.createElement('div');
    actions.classList.add('actions');
    const actionButtons = {};

    const editBtn = document.createElement('div');
    editBtn.classList.add('edit');

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete');

    actionButtons.checkbox = checkbox;
    actionButtons.edit = editBtn;
    actionButtons.delete = deleteBtn;

    actions.appendChild(actionButtons.edit);
    actions.appendChild(actionButtons.delete);

    taskDisplay.appendChild(checkbox);
    taskDisplay.appendChild(taskInfo);
    taskDisplay.appendChild(actions);

    this.#items.appendChild(taskDisplay);

    return { taskDisplay, actionButtons };
  }

  removeTaskDisplay(taskDisplay) {
    this.#items.removeChild(taskDisplay);
  }
}

export { DisplayController };
