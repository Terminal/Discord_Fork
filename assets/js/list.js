const GITHUB_URL = 'https://github.com';
const POINTS_PER_STAR = 0.02;

window.addEventListener('load', () => {
	const list = document.getElementById('list');
	const spinner = document.getElementsByClassName('loader');
  const search = document.getElementById('search');

	// If a list exists on the page, detect the type of list to display
	if (list) {
		const listType = list.dataset.listType || 'bots';
		const listCategory = list.dataset.listCategory || 'all';
		createList(list, listType, listCategory);
	}

	// Delete the spinner after loading
	if (spinner && spinner[0]) {
		spinner[0].parentNode.removeChild(spinner[0]);
	}

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
});

const createList = async (target, type = 'bots', category = 'all', sort = 'score') => {
	const items = await fetch(`/api/${type}/${category}.json`)
		.then(data => data.json());

  items
    .map((item) => { // Get the number of stars for each item
      // If logged in, and a repo and owner exists, get the number of stars
      if (github && item.github && item.github.repo && item.github.owner) {
        item.stars = getStars(item.github.owner, item.github.repo);
      }
      return item;
    })
    .map((item) => {
      // Create a random score
      item.score = Math.random();

      switch(sort) {
        case 'score':
          // Even HAVING a GitHub repository is worth 1 point
          if (item.github && item.github.repo && item.github.owner) item.score += 1;
          // Each star is worth 0.02 points
          if (item.stars) item.score += item.stars * POINTS_PER_STAR;
          break;
        case 'stars':
          // Each star IS a point. No stars is no points.
          if (item.stars) item.score = item.stars || 0;
          break;
        case 'random':
          // Do not rely on stars
          break;
      }
      return item;
    })
		.sort((a, b) => b.score - a.score) // Sort the cards based on the score
    .forEach((item) => { // Display each card in order
      const itemCard = document.createElement('section');
      itemCard.classList.add('card');

      const createButtonsBox = () => {
        const buttonsBox = document.createElement('div');
        
        buttonsBox.classList.add('footer');

        if (item.link) {
          if (type === 'bots') {
            buttonsBox.appendChild(createBotInviteModalButton(item.link));
          } else if (type === 'bans') {
            buttonsBox.appendChild(createBansInviteButton(item.id));
          } else {
            buttonsBox.appendChild(createGenericInviteButton(item.link));
          }
        }

        if (item.github && item.github.repo && item.github.owner) {
          buttonsBox.appendChild(createViewGitHubButton(item.github.owner, item.github.repo));
          // If authenticated, show the toggling button
          // Otherwise, show the "please login via GitHub" button
          if (github) {
            buttonsBox.appendChild(createToggleStarButton(item.github.owner, item.github.repo, item.stars));
          } else {
            // buttonsBox.appendChild(createLoginThenStarButton());
          }
        }

        return buttonsBox;
      };

      itemCard.dataset.score = item.score;

      itemCard.appendChild(createAvatarBox(item.avatar, item.nsfw));
      itemCard.appendChild(createContentBox(item.name, item.description, type, item.id, item.nsfw));
			itemCard.appendChild(createButtonsBox());
			target.appendChild(itemCard);
		});
};
