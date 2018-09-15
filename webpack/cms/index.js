module.exports = (github, localStorage) => {
  const terminal = github.getRepo('terminal', 'discord_fork');

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

  const cmsForkButton = document.getElementById('cms-fork-button');

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

  const findChildRepos = async () => {
    const userRepos = await github.getUser().listRepos();
    const terminalForks = await terminal.listForks();

    // Find node_ids that are both in the list of Terminal Forks and User Repos
    const children = terminalForks.data.filter((terminalFork) => {
      for (let i = 0; i < userRepos.data.length; i += 1) {
        if (userRepos.data[i].node_id === terminalFork.node_id) return true;
      }
      return false;
    });

    if (children.length) {
      [...cmsTab.children].forEach((btn) => {
        btn.classList.remove('hide');
      });
      activateButton('changes')();
      window.history.replaceState(null, null, `?owner=${children[0].owner.login}&repo=${children[0].name}`);
    } else {
      activateButton('fork')();
    }
  };

  const forkTerminalRepo = () => {
    terminal.fork((err, forkData) => {
      if (err) {
        window.history.replaceState(null, null, `?owner=${forkData.owner.login}&repo=${forkData.name}`);
      } else {
        findChildRepos();
      }
    });
  };

  cmsTabButtonChanges.addEventListener('click', activateButton('changes'));
  cmsTabButtonBots.addEventListener('click', activateButton('bots'));
  cmsTabButtonServers.addEventListener('click', activateButton('servers'));
  cmsTabButtonDocs.addEventListener('click', activateButton('docs'));
  cmsForkButton.addEventListener('click', forkTerminalRepo);

  findChildRepos();
};
