window.addEventListener('load', () => {
  const messages = [
    'Let\'s dance the night away!',
    'jQuery free',
    'Compatible with Microsoft Internet Explorer 6 and Netscape Navigator 5.0 and above',
    'Built for Windows XP - Compatible with Windows Vista',
    'jyp',
    '<blockquote>{{ random.message }}</blockquote> - {{ random.author }}'
  ];

  const randomMessages = document.getElementById('randomMessages');
  if (randomMessages) {
    randomMessages.innerText = messages[Math.floor(messages.length * Math.random())]
  }
})