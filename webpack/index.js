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
    if (/\/oauth\/login\//.test(window.location.pathname)) require('./pages/login')(localStorage);
    if (/\/oauth\/callback\//.test(window.location.pathname)) require('./pages/callback')(localStorage);
    if (/\/edit/.test(window.location.pathname)) require('./pages/edit')(github, localStorage);
    if (/\/cms/.test(window.location.pathname)) require('./cms/')(github, localStorage);
  };

  document.addEventListener('DOMContentLoaded', run);
})(localStorage);
