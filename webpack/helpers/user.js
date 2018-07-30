const updateButton = (localStorage) => {
  const loginButton = document.getElementById('loginButton');
  const data = JSON.parse(localStorage.getItem('userinfo'));
  if (loginButton) {
    loginButton.innerText = `Logout from ${data.name || data.login}`;
    loginButton.href = null;
    loginButton.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload(true);
    })
  }
}

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
