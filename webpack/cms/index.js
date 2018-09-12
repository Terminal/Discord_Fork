module.exports = (github, localStorage) => {
  // If the user is not authenticated, redirect to the login menu
  if (!github) {
    localStorage.setItem('return', window.location.pathname);
    window.location.pathname = '/oauth/login';
  }
};
