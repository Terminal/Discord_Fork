const { showModal, closeModal } = require('./../helpers/modals');
const { getStars } = require('./../helpers/info');
const { createToggleStarButton } = require('./../helpers/elements');

module.exports = (github, localStorage) => {
  const avatar = document.getElementById('avatar');
  const button = document.getElementById('invite');
  const siteLang = document.documentElement.getAttribute('lang');
  const itemCategory = document.body.dataset.itemCategory;
  const itemId = document.body.dataset.itemId;

  if (avatar.naturalHeight === 0) {
    avatar.src = '/assets/images/logo.png';
  }

  let path = `/api/${itemCategory}/${itemId}.json`;

  if (siteLang !== 'en') {
    path = `/${siteLang}${path}`;
  }

  fetch(path)
    .then(data => data.json())
    .then((data) => {
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
    
      if (github && data.github && data.github.owner && data.github.repo) {
        getStars(github, localStorage, data.github.owner, data.github.repo)
          .then((stars) => {
            const starButton = createToggleStarButton(data.github.owner, data.github.repo, stars, ['btn', 'wisteria'], github);
            const buttons = document.getElementById('buttons');
            buttons.appendChild(starButton);
          });
      }
    });
};
