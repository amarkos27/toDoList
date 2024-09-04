class ConfirmModal {
  constructor(headerText, descText, confirmText) {
    const confirmOverlay = document.createElement('div');
    confirmOverlay.classList.add('confirm-overlay');

    const confirmModal = document.createElement('div');
    confirmModal.classList.add('confirm-modal', 'modal');

    const header = document.createElement('h1');
    header.textContent = headerText;

    const description = document.createElement('p');
    description.textContent = descText;

    const confirmButtons = document.createElement('div');
    confirmButtons.classList.add('confirm-buttons');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.classList.add('cancel');
    cancel.textContent = 'Cancel';

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.classList.add('confirm');
    confirm.textContent = confirmText;

    confirmButtons.appendChild(cancel);
    confirmButtons.appendChild(confirm);

    confirmModal.appendChild(header);
    confirmModal.appendChild(description);
    confirmModal.appendChild(confirmButtons);

    confirmOverlay.appendChild(confirmModal);

    this.confirmButtons = { cancel, confirm };
    this.confirmOverlay = confirmOverlay;
  }
}

export { ConfirmModal };
