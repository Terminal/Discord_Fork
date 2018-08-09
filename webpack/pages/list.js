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
        if (data && data.data && typeof data.data.stargazers_count === 'number') {
          buttonsBox.appendChild(elements.createToggleStarButton(listItem.github.owner, listItem.github.repo, data.data.stargazers_count, [], github));
        } else {
          // Can't find data - just link to the GitHub
          buttonsBox.appendChild(elements.createViewGitHubButton(listItem.github.owner, listItem.github.repo, 'Star'))
        }
      } else {
        buttonsBox.appendChild(elements.createLoginThenStarButton());
      }
    }

    return buttonsBox;
  };

  if (data && data.data) {
    // If a GitHub repository exists, add 1 point.
    calculatedScore += 1;

    // For any licence, add 1 point.
    if (data.data.license && data.data.license.spdx_id) {
      // licence is spelled right, deal with the .co.uk
      itemCard.dataset.licence = data.data.license.spdx_id;
      calculatedScore += 1;
    }
  }
  
  itemCard.dataset.randomScore = Math.random();
  itemCard.dataset.calculatedScore = calculatedScore;
  itemCard.dataset.id = listItem.id;

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
          let text = '';

          text += card.innerText;
          text += card.dataset.id;
          if (card.dataset.licence) text += card.dataset.licence;

          // If can't find the card
          if (text.toLowerCase().indexOf(query) === -1) {
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
