const elements = require('./../helpers/elements');
const info = require('./../helpers/info');

const createCard = (github, localStorage, listItem, data = {}, type) => {
  const itemCard = document.createElement('section');

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

  itemCard.dataset.randomScore = Math.random();
  itemCard.dataset.id = listItem.id;

  itemCard.appendChild(elements.createAvatarBox(listItem.avatar, listItem.nsfw));
  itemCard.appendChild(elements.createContentBox(listItem.pagename, listItem.description, type, listItem.permalink, listItem.nsfw, listItem.lang));
  itemCard.appendChild(createButtonsBox());
  return itemCard;
};

const appendCard = (github, localStorage, item, data, type) => {
  const list = document.getElementById('list');
  const card = createCard(github, localStorage, item, data, type);
  list.appendChild(card);
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
    const siteLang = document.documentElement.getAttribute('lang');
    let path = `/api/${type}/all.json`;

    if (siteLang !== 'en') {
      path = `/${siteLang}${path}`;
    }

    // If the language is English, do not add the language path
    fetch(path)
      .then(data => data.json())
      .then((items) => {
        const displayOrder = items
          .map((item) => {
            let score = Math.random();
            if (item.github) score += 2;
            if (siteLang === item.lang) score += 10;
            item.score = score;
            return item;
          })
          .sort((a, b) => {
            return b.score - a.score;
          });
        const displayItems = (subset) => {
          subset.forEach((listItem) => {
            if (github && listItem.github && listItem.github.repo && listItem.github.owner) {
              info.getInfo(github, localStorage, listItem.github.owner, listItem.github.repo)
                .then((data) => {
                  appendCard(github, localStorage, listItem, data, type);
                })
                .catch((error) => {
                  console.error(error);
                  appendCard(github, localStorage, listItem, {}, type);
                });
            } else {
              appendCard(github, localStorage, listItem, {}, type);
            }
          });
        };
        
        displayItems(displayOrder.splice(0, 10));

        document.addEventListener('scroll', (event) => {
          if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100 && items.length) {
            displayItems(displayOrder.splice(0, 10));
          }
        });
      });
  }
};
