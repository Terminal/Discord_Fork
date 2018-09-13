/**
 * Set a random message to randomMessages
 */
(() => {
  const adverts = document.getElementById('adverts');
  const randomMessage = document.getElementById('randomMessage');
  if (adverts) {
    fetch('/assets/json/random.json')
      .then(data => data.json())
      .then((data) => {
        // innerText thanks
        adverts.innerText = data[Math.floor(data.length * Math.random())];

        const id = setInterval(() => {
          if (adverts.offsetHeight === 0) {
            randomMessage.classList.remove('hidden');
            clearInterval(id);
          }
        }, 20);
      });
  }
})();
