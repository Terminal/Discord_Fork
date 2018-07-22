const showModal = (discordWindow, modalName) => {
  const modal = document.getElementById(modalName || 'modal');
  const exit = modal.getElementsByClassName('close')[0];

  modal.classList.remove('modal--close');
  modal.style.display = 'block';

	const timer = setInterval(() => {
		if (discordWindow.closed) {
			clearInterval(timer);
			closeModal();
			console.log('Window closed!');
		}
  }, 20);

  if (exit && modal) {
    exit.addEventListener('click', closeModal);
    modal.addEventListener('click', closeModal);
  }
}

const closeModal = (event, modalName) => {
  const modal = document.getElementById(modalName || 'modal');
  const exit = modal.getElementsByClassName('close')[0];

  if (!event || modal === event.target || exit === event.target) {
    modal.classList.add('modal--close');
    setTimeout(() => {
      if (modal.classList.contains('modal--close')) {
        modal.style.display = null;
      }
    }, 575);
  }
}
