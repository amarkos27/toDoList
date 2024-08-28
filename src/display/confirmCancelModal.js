class CancelModal {
  constructor() {
    const cancelOverlay = document.createElement('div');
    cancelOverlay.classList.add('cancel-overlay');

    const cancelModal = document.createElement('div');
    cancelModal.classList.add('cancel-modal', 'modal');

    const discardHeader = document.createElement('h1');
    discardHeader.textContent = 'Discard Changes?';

    const discardDescription = document.createElement('p');
    discardDescription.textContent = 'No changes will be saved.';

    const cancelButtons = document.createElement('div');
    cancelButtons.classList.add('cancel-buttons');

    const cancelDiscard = document.createElement('button');
    cancelDiscard.type = 'button';
    cancelDiscard.classList.add('cancel');
    cancelDiscard.textContent = 'Cancel';

    const discard = document.createElement('button');
    discard.type = 'button';
    discard.classList.add('discard');
    discard.textContent = 'Discard';

    cancelButtons.appendChild(cancelDiscard);
    cancelButtons.appendChild(discard);

    cancelModal.appendChild(discardHeader);
    cancelModal.appendChild(discardDescription);
    cancelModal.appendChild(cancelButtons);

    cancelOverlay.appendChild(cancelModal);

    this.cancelButtons = { cancelDiscard, discard };
    this.cancelOverlay = cancelOverlay;
  }
}

export { CancelModal };
