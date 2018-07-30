const showModal = (modalName) => {
  const modal = document.getElementById(modalName);

  const close = (event) => {
    closeModal(event, modalName);
  }

  if (modal) {
    const exit = modal.getElementsByClassName('close')[0];

    modal.classList.remove('modal--close');
    modal.style.display = 'block';

    if (exit && modal) {
      exit.addEventListener('click', close);
      modal.addEventListener('click', close);
    }
  }
}

const closeModal = (event, modalName) => {
  const modal = document.getElementById(modalName);
  const exit = modal.getElementsByClassName('close')[0];

  if (!event || modal === event.target || exit === event.target) {
    modal.classList.add('modal--close');
    modal.classList.remove('hidden');
    setTimeout(() => {
      if (modal.classList.contains('modal--close')) {
        modal.classList.add('hidden');
      }
    }, 575);
  }
}

module.exports = {
  showModal,
  closeModal
}
