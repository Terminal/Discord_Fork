const GitHub = require('github-api');

/**
 * Set the login button to show a name
 * @param {localStorage} localStorage The localStorage object
 */
const updateButton = (localStorage) => {
  const loginButton = document.getElementById('loginButton');
  const data = JSON.parse(localStorage.getItem('userinfo'));
  if (loginButton) {
    loginButton.innerText = `Logout from ${data.name || data.login}`;
    loginButton.href = '#';
    loginButton.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload(true);
    })
  }
}

/**
 * Grab information about the user in cache, or load and save to cache
 * @param {GitHub} github The GitHub object
 * @param {localStorage} localStorage The localStorage object
 */
module.exports = (github, localStorage) => {
  if (github && !localStorage.getItem('user')) {
    github
      .getUser()
      .getProfile()
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else if (data.data) {
          localStorage.setItem('userinfo', JSON.stringify(data.data));
          updateButton(localStorage);
        }
      });
  } else if (github && localStorage.getItem('user')) {
    updateButton(localStorage);
  }
};
