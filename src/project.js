class Project {
  constructor(projectName) {
    this.projectName = projectName;

    this.display = document.createElement('button');
    this.display.type = 'button';
    this.display.classList.add('option');
    this.display.textContent = projectName;
  }
}

export { Project };
