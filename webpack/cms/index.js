module.exports = (github, localStorage) => {
  const cmsTab = document.getElementById('cms-tab');
  const cmsWindows = document.getElementById('cms-windows');
  const cmsTabButtonChanges = document.getElementById('cms-tab-button-changes');
  const cmsTabButtonBots = document.getElementById('cms-tab-button-bots');
  const cmsTabButtonServers = document.getElementById('cms-tab-button-servers');
  const cmsTabButtonDocs = document.getElementById('cms-tab-button-docs');
  // const cmsWindowButtonChanges = document.getElementById('cms-window-changes');
  // const cmsWindowButtonBots = document.getElementById('cms-window-bots');
  // const cmsWindowButtonServers = document.getElementById('cms-window-servers');
  // const cmsWindowButtonDocs = document.getElementById('cms-window-docs');

  // If the user is not authenticated, redirect to the login menu
  if (!github) {
    localStorage.setItem('return', window.location.pathname);
    window.location.pathname = '/oauth/login';
  }

  window.github = github;

  const activateButton = button => () => {
    [...cmsTab.children].forEach((btn) => {
      if (btn.dataset.cmsTabCategory === button) {
        btn.classList.remove('primary-flat');
        btn.classList.add('white-flat', 'black-text');
      } else {
        btn.classList.add('primary-flat');
        btn.classList.remove('white-flat', 'black-text');
      }
    });
    [...cmsWindows.children].forEach((win) => {
      if (win.dataset.cmsWindowCategory === button) {
        win.classList.remove('hidden');
      } else {
        win.classList.add('hidden');
      }
    });
  };

  cmsTabButtonChanges.addEventListener('click', activateButton('changes'));
  cmsTabButtonBots.addEventListener('click', activateButton('bots'));
  cmsTabButtonServers.addEventListener('click', activateButton('servers'));
  cmsTabButtonDocs.addEventListener('click', activateButton('docs'));
};
