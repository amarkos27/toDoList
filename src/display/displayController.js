import { SidebarController } from './sidebarController.js';
import { ModalController } from './modalController.js';
import { TaskDisplayController } from './taskDisplay.js';
import { TaskGroup } from './taskGroup.js';

class DisplayController {
  #itemsWrapper = document.querySelector('.items-wrapper');
  #items = document.querySelector('.items');
  #content = document.querySelector('#content');
  #activeFilter;

  constructor() {
    this.sidebarController = new SidebarController(this.#content);
    this.modalController = new ModalController(
      this.#items,
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
    const enteredDate = new Date(datePicker.value);
    const currentDate = new Date();
    if (datePicker.value) {
      if (enteredDate < currentDate) {
        datePicker.setCustomValidity(
          `Please enter date and time after ${currentDate.toLocaleString(
            'en-US',
            {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }
          )}.`
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
    dateTime.max = '9999-12-31T23:59';
    dateTime.oninvalid = this.onInvalidDate;
    dateTime.oninput = this.onValidDate;

    return dateTime;
  };

  createSearchInput() {
    const container = document.createElement('div');
    container.classList.add('search-container');

    const searchInput = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.placeholder = 'Search by task name ....';

    const datePicker = this.buildDatePicker();
    datePicker.min = '';
    datePicker.oninvalid = null;
    datePicker.oninput = null;

    container.append(searchInput, datePicker);
    this.#itemsWrapper.prepend(container);

    return { searchInput, datePicker };
  }

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
    this.modalController.closeExistingModal();

    const form = this.modalController.newTaskModal(projects);

    return form;
  }

  newProjectModal(existingProject = null) {
    this.modalController.closeExistingModal();

    const projectModal = this.modalController.newProjectModal(existingProject);

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

  taskIsDisplayed(taskDisplay) {
    if (this.#items.contains(taskDisplay)) return true;
    else return false;
  }

  currentOpenFilter() {
    return this.#activeFilter;
  }

  closeEdit(taskDisplay, editPane) {
    this.taskDisplayController.closeEdit(taskDisplay, editPane);
  }

  confirmCancel() {
    const cancelModal = this.modalController.createCancelModal();

    return cancelModal;
  }

  confirmDelete(projectName) {
    const deleteModal = this.modalController.createDeleteModal(projectName);

    return deleteModal;
  }

  confirmEditProject(oldProjectName, newProjectName) {
    const confirmEditProjectModal =
      this.modalController.createConfirmEditProject(
        oldProjectName,
        newProjectName
      );

    return confirmEditProjectModal;
  }

  updateProject(project, updatedProject) {
    this.sidebarController.updateProject(project, updatedProject);
  }

  updateTaskOfProject(task, oldDisplay) {
    const { taskDisplay, actionButtons } =
      this.taskDisplayController.createTaskDisplay(task);

    this.taskDisplayController.insertTaskDisplay(taskDisplay, oldDisplay);
    this.taskDisplayController.removeTaskDisplay(oldDisplay);

    return { taskDisplay, actionButtons };
  }

  clearTasks() {
    this.#items.innerHTML = '';
  }

  filterTasks(tasksToDisplay, filterName = null, activeFilterButton = null) {
    // If filterName and activeFilterButton are not passed to the function, it will filter by whatever tasks are passed to it
    // with no filter header. If they are passed, the header will be present and any time a new task is added, the filter button
    // will be "clicked" to refresh the page to show the proper tasks

    this.clearTasks();

    const existingFilter = this.#itemsWrapper.querySelector('.project-header');
    if (existingFilter) this.#itemsWrapper.removeChild(existingFilter);

    if (filterName) {
      const header = document.createElement('h1');
      header.classList.add('project-header');
      header.textContent = `${filterName}`;
      this.#itemsWrapper.prepend(header);

      this.#activeFilter = activeFilterButton;
    } else {
      this.#activeFilter = null;
    }
    for (const task of tasksToDisplay) {
      this.#items.appendChild(task.display);
    }
  }

  formatOverdue(overdue, notOverdue, filterName) {
    if (overdue.length) {
      const overdueGroup = new TaskGroup(
        'Overdue',
        overdue,
        this.#activeFilter
      );
      this.#items.prepend(overdueGroup.container);
    }

    if (notOverdue.length) {
      const notOverdueGroup = new TaskGroup(
        filterName,
        notOverdue,
        this.#activeFilter
      );
      this.#items.appendChild(notOverdueGroup.container);
    }
  }
}

export { DisplayController };
