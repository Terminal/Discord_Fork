window.addEventListener('load', () => {
  const modal = document.getElementById('modal');
  const exit = document.getElementById('closeModal');

  if (exit && modal) {
    exit.addEventListener('click', closeModal);
    modal.addEventListener('click', closeModal);
  }
});

const showModal = (discordWindow) => {
  const modal = document.getElementById('modal');
  
  modal.classList.remove('modal--close');
  modal.style.display = 'block';

	const timer = setInterval(() => {
		if (discordWindow.closed) {
			clearInterval(timer);
			closeModal();
			console.log('Window closed!');
		}
	}, 20);
}

const closeModal = (event) => {
  const modal = document.getElementById('modal');
  const exit = document.getElementById('closeModal');

  if (!event || modal === event.target || exit === event.target) {
    modal.classList.add('modal--close');
    setTimeout(() => {
      if (modal.classList.contains('modal--close')) {
        modal.style.display = null;
      }
    }, 575);
  }
}
