let github = null;

(() => {
  const localStorageCopy = localStorage;
  
  if (GitHub && localStorageCopy.getItem('github')) {
    github = new GitHub({
      token: localStorageCopy.getItem('github')
    });
  }

  let githubCopy = github;
  
  window.addEventListener('load', () => {
    if (githubCopy && !localStorageCopy.getItem('user')) {
      githubCopy
        .getUser()
        .getProfile()
        .then((data) => {
          if (data.message) {
            showToast(data.message);
          } else if (data.data) {
            localStorageCopy.setItem('userinfo', JSON.stringify(data.data));
            showButton();
          }
        });
    } else if (githubCopy && localStorageCopy.getItem('user')) {
      showButton();
    }
  });

  const showButton = () => {
    const loginButton = document.getElementById('loginButton');
    const data = JSON.parse(localStorageCopy.getItem('userinfo'));
    if (loginButton) {
      loginButton.innerText = `Logout from ${ data.name || data.login }`;
      loginButton.href = '#';
      loginButton.addEventListener('click', () => {
        localStorageCopy.clear();
        window.location.reload(true);
      })
    }
  }
})();

