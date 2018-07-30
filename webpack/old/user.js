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

const checkStorage = (localStorageClone) => {
  if (!(localStorageClone || localStorage).getItem('repos')) {
    // If it doesn't exist, create it.
    (localStorageClone || localStorage).setItem('repos', "{}");
  }
};

const getInfo = (owner, repo, githubClone, localStorageClone) => new Promise((resolve, reject) => {
  checkStorage(localStorageClone);
  owner = owner.toLowerCase();
  repo = repo.toLowerCase();

  // Get information about the current bot
  const cachedInfo = JSON.parse((localStorageClone || localStorage).getItem('repos'))[`${owner}/${repo}`];
  const repository = (githubClone || github).getRepo(owner, repo);

  // If the GitHub information doesn't exist, or it has expired, refetch the data
  if (!cachedInfo || (cachedInfo && cachedInfo.time < Date.now())) {
    repository
      .getDetails()
      .then((data) => {
        // If GitHub returned a message, show a toast
        if (data.message) {
          reject(data.message);
        } else if (data.data) {
          // If there is data, insert the data into the local cache, and set expiry to 12 hours.
          (localStorageClone || localStorage).setItem('repos', JSON.stringify(Object.assign(JSON.parse((localStorageClone || localStorage).getItem('repos')), {
            [`${owner}/${repo}`]: {
              data: data.data,
              time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }
          })));
          resolve(data); // the number of stars the project has at this precise moment
        }
      });
  } else {
    // Use the cached data
    resolve(cachedInfo); // the number of stars in the cache
  }
});

const getStars = (owner, repo, githubClone, localStorageClone) => new Promise((resolve, reject) => {
  getInfo(owner, repo, githubClone, localStorageClone)
    .then((data) => {
      resolve(data.data.stargazers_count);
    })
    .catch(reject);
});
