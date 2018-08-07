/**
 * Set a random message to randomMessages
 */
(() => {
  const randomMessages = document.getElementById('randomMessages');
  if (randomMessages) {
    fetch('/assets/json/random.json')
      .then(data => data.json())
      .then((data) => {
        // innerText thanks
        randomMessages.innerText = data[Math.floor(data.length * Math.random())];
      });
  }
})();
