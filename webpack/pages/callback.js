module.exports = (localStorage) => {
  const code = window.location.href.match(/\?code=(.*)/);
  const redirect = localStorage.getItem('return') || '/';
  const gatekeeper = document.getElementById('gatekeeper').innerText;

  if (code && code[1]) {
    fetch(`${gatekeeper}/${code[1]}`)
      .then(data => data.json())
      .then((data) => {
        if (data.token) localStorage.setItem('github', data.token);
        next();
      })
      .catch((error) => {
        throw error;
      });
  } else {
    next();
  }

  console.log(localStorage);

  const next = () => {
    if (redirect === '') {
      window.location.href = '/';
    } else {
      window.location.href = redirect;
    }
  }
};
