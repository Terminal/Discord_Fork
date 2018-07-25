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

const checkStorage = () => {
  if (!localStorage.getItem('repos')) {
    // If it doesn't exist, create it.
    localStorage.setItem('repos', "{}");
  }
};

const getStars = (owner, repo) => {
  checkStorage();
  owner = owner.toLowerCase();
  repo = repo.toLowerCase();

  // Get information about the current bot
  const cachedInfo = JSON.parse(localStorage.getItem('repos'))[`${owner}/${repo}`];
  const repository = github.getRepo(owner, repo);

  // If the GitHub information doesn't exist, or it has expired, refetch the data
  if (!cachedInfo || (cachedInfo && cachedInfo.time < Date.now())) {
    repository
      .getDetails()
      .then((data) => {
        // If GitHub returned a message, show a toast
        if (data.message) {
          showToast(data.message);
        } else if (data.data) {
          // If there is data, insert the data into the local cache, and set expiry to 12 hours.
          localStorage.setItem('repos', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('repos')), {
            [`${owner}/${repo}`]: {
              data: data.data,
              time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }
          })));
          return data.data.stargazers_count; // the number of stars the project has at this precise moment
        }
      });
  } else {
    // Use the cached data
    return cachedInfo.data.stargazers_count; // the number of stars in the cache
  }
};
