class TaskGroup {
  constructor(name, tasks, activeFilter) {
    const taskGroup = document.createElement('div');
    taskGroup.classList.add('task-group');

    const header = document.createElement('div');
    header.classList.add('task-group-header');

    const h3 = document.createElement('h3');
    h3.textContent = name;

    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const groupContainer = document.createElement('div');
    groupContainer.classList.add('group-container');

    dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('clicked');
      groupContainer.classList.toggle('hide');
    });

    for (const task of tasks) {
      groupContainer.appendChild(task.display);
    }

    header.appendChild(h3);
    header.appendChild(dropdown);
    taskGroup.appendChild(header);
    taskGroup.appendChild(groupContainer);

    this.container = taskGroup;
    this.removeIfEmpty(this.container, groupContainer, activeFilter);
  }

  removeIfEmpty(wholeContainer, tasksContainer, activeFilter) {
    const targetNode = tasksContainer;

    const config = { childList: true };

    const callback = (mutations, observer) => {
      if (!document.body.contains(wholeContainer)) {
        observer.disconnect();
        return;
      }

      if (!tasksContainer.children.length) {
        activeFilter.click();
        observer.disconnect();
      }
    };

    const childListObserver = new MutationObserver(callback);
    childListObserver.observe(targetNode, config);
  }
}

export { TaskGroup };
