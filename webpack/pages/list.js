const elements = require('./../helpers/elements');
const info = require('./../helpers/info');

const createCard = (github, localStorage, item, data, type) => {
  const itemCard = document.createElement('section');
  let calculatedScore = Math.random();

  itemCard.classList.add('card');
  const createButtonsBox = () => {
    const buttonsBox = document.createElement('div');
    
    buttonsBox.classList.add('footer');

    if (item.link) {
      if (type === 'bots') {
        buttonsBox.appendChild(elements.createBotInviteModalButton(item.link));
      } else if (type === 'bans') {
        buttonsBox.appendChild(elements.createBansInviteButton(item.id));
      } else {
        buttonsBox.appendChild(elements.createGenericInviteButton(item.link));
      }
    }

    if (item.github && item.github.repo && item.github.owner) {
      buttonsBox.appendChild(elements.createViewGitHubButton(item.github.owner, item.github.repo));
      // If authenticated, show the toggling button
      // Otherwise, show the "please login via GitHub" button
      if (github) {
        buttonsBox.appendChild(elements.createToggleStarButton(item.github.owner, item.github.repo, data.data.stargazers_count, [], github));
      } else {
        buttonsBox.appendChild(elements.createLoginThenStarButton());
      }
    }

    return buttonsBox;
  };

  if (data && data.data) {
    // If there is GitHub data, add 1 to the score.
    calculatedScore += 1;

    // For each star, add 0.05 points.
    if (data.data.stargazers_count) {
      itemCard.dataset.stars = data.data.stargazers_count;
      calculatedScore += data.data.stargazers_count * 0.05;
    }

    // For any licence, add 0.2 points.
    if (data.data.license && data.data.license.spdx_id) {
      itemCard.dataset.licence = data.data.license.spdx_id;
      calculatedScore += 0.2;
    }
  }
  
  itemCard.dataset.randomScore = Math.random();
  itemCard.dataset.calculatedScore = calculatedScore;

  itemCard.appendChild(elements.createAvatarBox(item.avatar, item.nsfw));
  itemCard.appendChild(elements.createContentBox(item.name, item.description, type, item.id, item.nsfw));
  itemCard.appendChild(createButtonsBox());
  return itemCard;
};

const sortCards = (ordering = 'calculatedScore') => {
  const list = document.getElementById('list');
  [...list.childNodes]
    .filter(card => card.nodeName === 'SECTION')
    .sort((a, b) => b.dataset[ordering] - a.dataset[ordering])
    .forEach(card => list.appendChild(card));
};

const createAppendSort = (github, localStorage, item, data, type) => {
  const list = document.getElementById('list');
  const card = createCard(github, localStorage, item, data, type);
  list.appendChild(card);
  sortCards();
}

module.exports = (github, localStorage) => {
  const list = document.getElementById('list');
  const search = document.getElementById('search');

  if (search && list) {
    search.addEventListener('keyup', () => {
      const query = search.value.toLowerCase().trim();
      const cards = [...list.childNodes];

      cards
        .filter(card => card.nodeName === 'SECTION')
        .forEach((card) => {
          // If can't find the card
          if (card.innerText.toLowerCase().indexOf(query) === -1) {
            card.classList.add('hidden');
          } else {
            // otherwise, allow it to be seen
            card.classList.remove('hidden');
          }
        });
    });
  }

  if (list) {
    const type = list.dataset.listType;
    fetch(`/api/${type}/all.json`)
      .then(data => data.json())
      .then((items) => {
        items.forEach((item) => {
          if (github && item.github && item.github.repo && item.github.owner) {
            info.getInfo(github, localStorage, item.github.owner, item.github.repo)
              .then((data) => {
                createAppendSort(github, localStorage, item, data, type);
              })
              .catch((error) => {
                console.error(error);
                createAppendSort(github, localStorage, item, data, type);
              });
          } else {
            createAppendSort(github, localStorage, item, {}, type);
          }
        });
      });
  }
};
