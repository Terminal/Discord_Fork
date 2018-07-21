const showToast = (text) => {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast-btn');
  toast.classList.add('btn');
  toast.classList.add('animation');
  toast.classList.add('emerald');
  toast.innerText = text;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style = 'height: 0px; margin-top: 0px; margin-bottom: 0px; font-size: 0pt;'
  }, 7000);

  setTimeout(() => {
    container.removeChild(toast);
  }, 8000);
};
