module.exports = (localStorage) => {
  const ua = navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  if (/Trident.*rv\:11\./.test(ua)) {
    window.location.pathname = '/docs/iexplore/';
  } else {
    const redirectButton = document.getElementById('redirect');
    localStorage.setItem('return', document.referrer);
    window.location.href = redirectButton.getAttribute('href');
  }
};
