(() => {
  const avatar = document.getElementById('avatar');
  const button = document.getElementById('invite');

  avatar.addEventListener('error', () => {
    avatar.src = '/assets/images/logo.png';
  });

  
  button.addEventListener('click', (e) => {
    const discordWindow = window.open("{{ page.link }}", '_blank', `toolbar=0,width=500,height=700,top=${Math.floor(screen.height / 2) - 250},left=${Math.floor(screen.width / 2) - 350}}`);
    showModal(discordWindow);
  });
})();
