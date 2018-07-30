(() => {
  const messages = [
    "One, two, three, let’s go\n저 우주 위로\n날아갈 듯 춤추러 가 Hey\nLet's dance the night away",
    "jQuery free - Yes it's possible!",
    "Compatible with Microsoft Internet Explorer 6 and Netscape Navigator 5.0 and above",
    "Built for Windows XP - Compatible with Windows Vista",
    "jyp",
    "<blockquote>{{ random.message }}</blockquote> - {{ random.author }}",
    "Made entirely of Document.createElement('div')"
  ];

  const randomMessages = document.getElementById('randomMessages');
  if (randomMessages) {
    randomMessages.innerText = messages[Math.floor(messages.length * Math.random())]
  }
})();
