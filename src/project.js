class Project {
  constructor(projectName) {
    this.projectName = projectName;

    this.display = document.createElement('button');
    this.display.type = 'button';
    this.display.classList.add('option');
    this.display.textContent = projectName;

    const actions = document.createElement('div');
    actions.classList.add('project-actions', 'actions');

    this.editBtn = document.createElement('div');
    this.editBtn.classList.add('edit');

    this.deleteBtn = document.createElement('div');
    this.deleteBtn.classList.add('delete');

    actions.appendChild(this.editBtn);
    actions.appendChild(this.deleteBtn);

    this.display.appendChild(actions);
  }
}

export { Project };
