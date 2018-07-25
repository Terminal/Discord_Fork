window.addEventListener('load', () => {
  const avatar = document.getElementById('avatar');
  const button = document.getElementById('invite');

  if (avatar) {
    avatar.addEventListener('error', () => {
      avatar.src = '/assets/images/logo.png';
    });
  }

  button.addEventListener('click', (e) => {
    const discordWindow = window.open(data.link, '_blank', `toolbar=0,width=500,height=700,top=${Math.floor(screen.height / 2) - 250},left=${Math.floor(screen.width / 2) - 350}}`);
    showModal('invite-modal');

    const timer = setInterval(() => {
      if (discordWindow.closed) {
        clearInterval(timer);
        closeModal(null, 'invite-modal');
      }
    }, 20);
  });
});
