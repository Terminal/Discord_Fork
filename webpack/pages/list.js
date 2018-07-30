const elements = require('./../helpers/elements');
const info = require('./../helpers/info');

const createCard = (github, localStorage, listItem, data = {}, type) => {
  const itemCard = document.createElement('section');
  let calculatedScore = Math.random();

  itemCard.classList.add('card');
  const createButtonsBox = () => {
    const buttonsBox = document.createElement('div');
    
    buttonsBox.classList.add('footer');

    if (listItem.link) {
      if (type === 'bots') {
        buttonsBox.appendChild(elements.createBotInviteModalButton(listItem.link));
      } else if (type === 'bans') {
        buttonsBox.appendChild(elements.createBansInviteButton(listItem.id));
      } else {
        buttonsBox.appendChild(elements.createGenericInviteButton(listItem.link));
      }
    }

    if (listItem.github && listItem.github.repo && listItem.github.owner) {
      buttonsBox.appendChild(elements.createViewGitHubButton(listItem.github.owner, listItem.github.repo));
      // If authenticated, show the toggling button
      // Otherwise, show the "please login via GitHub" button
      if (github) {
        buttonsBox.appendChild(elements.createToggleStarButton(listItem.github.owner, listItem.github.repo, data.data.stargazers_count, [], github));
      } else {
        buttonsBox.appendChild(elements.createLoginThenStarButton());
      }
    }

    return buttonsBox;
  };

  if (listItem.github && listItem.github.repo && listItem.github.owner) {
    // If there's a GitHub repo, add 1 point.
    calculatedScore += 1;
  }

  if (data && data.data) {
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

  itemCard.appendChild(elements.createAvatarBox(listItem.avatar, listItem.nsfw));
  itemCard.appendChild(elements.createContentBox(listItem.name, listItem.description, type, listItem.id, listItem.nsfw));
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
        items.forEach((listItem) => {
          if (github && listItem.github && listItem.github.repo && listItem.github.owner) {
            info.getInfo(github, localStorage, listItem.github.owner, listItem.github.repo)
              .then((data) => {
                createAppendSort(github, localStorage, listItem, data, type);
              })
              .catch((error) => {
                console.error(error);
                createAppendSort(github, localStorage, listItem, {}, type);
              });
          } else {
            createAppendSort(github, localStorage, listItem, {}, type);
          }
        });
      });
  }
};
