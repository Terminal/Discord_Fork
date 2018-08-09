require('babel-polyfill');

((localStorage) => {
  const run = () => {
    const GitHub = require('github-api');
    let github = null;
    const token = localStorage.getItem('github');

    if (token) {
      github = new GitHub({
        token: localStorage.getItem('github')
      });
    }

    require('./helpers/random');
    require('./helpers/user')(github, localStorage);
    if (document.body.dataset.lsType === 'docs') require('./pages/documentation')();
    if (document.body.dataset.lsType === 'list') require('./pages/list')(github, localStorage);
    if (document.body.dataset.lsType === 'item') require('./pages/item.js')(github, localStorage);
    if (window.location.pathname === '/oauth/login/') require('./pages/login')(localStorage);
    if (window.location.pathname === '/oauth/callback/') require('./pages/callback')(localStorage);
    if (window.location.pathname === '/edit') require('./pages/edit')(github, localStorage);
    if (window.location.pathname === '/preview') require('./pages/preview')();
  };

  document.addEventListener('DOMContentLoaded', run);
})(localStorage);
