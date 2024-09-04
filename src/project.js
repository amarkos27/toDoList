class Project {
  constructor(projectName) {
    this.projectName = projectName;

    this.display = document.createElement('button');
    this.display.type = 'button';
    this.display.classList.add('option');
    this.display.textContent = projectName;

    this.actions = document.createElement('div');
    this.actions.classList.add('project-actions', 'actions');

    this.editBtn = document.createElement('div');
    this.editBtn.classList.add('edit');

    this.deleteBtn = document.createElement('div');
    this.deleteBtn.classList.add('delete');

    this.actions.appendChild(this.editBtn);
    this.actions.appendChild(this.deleteBtn);

    this.display.appendChild(this.actions);
  }
}

export { Project };
