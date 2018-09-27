/**
 * Open a modal
 * @param {String} modalName The ID of the modal
 */
const showModal = (modalName) => {
  const modal = document.getElementById(modalName);

  const close = (event) => {
    closeModal(event, modalName);
  };

  if (modal) {
    const exit = modal.getElementsByClassName('close')[0];

    modal.classList.remove('modal--close');
    modal.classList.remove('hidden');
    modal.style.display = 'block';

    if (exit && modal) {
      exit.addEventListener('click', close);
      modal.addEventListener('click', close);
    }
  }
};

/**
 * Close a modal
 * @param {?Event} event An optional event for clicks
 * @param {String} modalName The ID of the modal
 */
const closeModal = (event, modalName) => {
  const modal = document.getElementById(modalName);
  const exit = modal.getElementsByClassName('close')[0];

  if ((!event || modal === event.target || exit === event.target) && modal.dataset.noclose !== 'true') {
    modal.classList.add('modal--close');
    setTimeout(() => {
      if (modal.classList.contains('modal--close')) {
        modal.classList.add('hidden');
      }
    }, 575);
  }
};

module.exports = {
  showModal,
  closeModal,
};
