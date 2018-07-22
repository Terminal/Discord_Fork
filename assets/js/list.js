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
			})
		})
  }
});

const createList = async (target, type = 'bots', category = 'all') => {
	const items = await fetch(`/api/${type}/${category}.json`)
		.then(data => data.json());

  items
    .map((item) => { // Get the number of stars for each item
      if (github && item.github && item.github.repo && item.github.owner) {
        // Check if the "local cache" object exists
        if (!localStorage.getItem('repos')) {
          // If it doesn't exist, create it.
          localStorage.setItem('repos', "{}");
        }

        // Get information about the current bot
        const cachedInfo = JSON.parse(localStorage.getItem('repos'))[`${item.github.owner}/${item.github.repo}`];
        const repository = github.getRepo(item.github.owner, item.github.repo)

        // If the GitHub information doesn't exist, or it has expired, refetch the data
        if (!cachedInfo || (cachedInfo && cachedInfo.time < Date.now())) {
          repository
            .getDetails()
            .then((data) => {
              // If GitHub returned a message, show a toast
              if (data.message) {
                showToast(data.message);
              } else if (data.data) {
                // If there is data, insert the data into the local cache, and set expiry to 12 hours.
                localStorage.setItem('repos', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('repos')), {
                  [`${item.github.owner}/${item.github.repo}`]: {
                    data: data.data,
                    time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
                  }
                })));
                item.stars = data.data.stargazers_count; // Set the label to the number of stars the project has at this precise moment
              }
            });
        } else {
          item.stars = cachedInfo.data.stargazers_count; // Set the label to the number of stars in the cache
        }
      }
      return item;
    })
    .map((item) => { // Calculate the score for each item
      item.score = Math.random();
      if (item.stars) {
        item.score += Math.log10(item.stars * 10) * 0.1;
      }
      return item;
    })
		.sort((a, b) => b.score - a.score) // Sort the cards based on the score
		.forEach((item) => { // Display each card in order
			const itemCard = document.createElement('section');
			const itemLink = document.createElement('a');
			const itemName = document.createElement('h4'); // New ModestaCSS uses h1
			const itemLogoBox = document.createElement('div');
			const itemLogo = document.createElement('img')
			const itemDesc = document.createElement('span');
			const itemButtons = document.createElement('div');

			itemCard.classList.add('card');

			itemLink.setAttribute('href', `/${type}/${item.id}`)

			itemName.innerText = item.name;
			itemName.classList.add('title');

			itemLogo.classList.add('avatar');
			itemLogo.src = item.avatar;

			if (item.nsfw) {
				// Append a "nsfw" tag
				const itemNSFW = document.createElement('span');
				itemNSFW.classList.add('nsfw-tag');
				itemNSFW.innerText = 'NSFW';
				itemName.appendChild(itemNSFW);

				// Add a blur to the NSFW logo
				itemLogo.classList.add('nsfw');
			}
			itemLogoBox.classList.add('avatar');
			itemLogoBox.appendChild(itemLogo);

			itemLogo.addEventListener('error', () => {
				itemLogo.src = '/assets/images/logo.png';
			});

			itemDesc.innerText = item.description;
			itemDesc.classList.add('description');

			if (item.link || type === 'bans') {
				const itemInvite = document.createElement('a');
				itemInvite.classList.add('btn', 'emerald', 'white-text', 'bold');

        if (type === 'bans') {
          itemInvite.innerText = 'View';
          itemInvite.href = `/${type}/${item.id}`;
        } else if (type === 'bots') {
          itemInvite.innerText = 'Invite';
          itemInvite.addEventListener('click', (e) => {
						const discordWindow = window.open(item.link, '_blank', `toolbar=0,width=500,height=700,top=${Math.floor(screen.height / 2) - 250},left=${Math.floor(screen.width / 2) - 350}}`);
						showModal(discordWindow);
					});
        } else {
          itemInvite.innerText = 'Invite';
          itemInvite.href = item.link;
        }

				itemButtons.appendChild(itemInvite);
      }
      
      if (github && item.github && item.github.repo && item.github.owner) {
        const githubButton = document.createElement('a');
        const countText = document.createElement('span');
        const githubLabel = document.createElement('span');
        const githubDash = document.createElement('span');
        let count = null;
        githubButton.classList.add('btn', 'peter-river', 'white-text', 'bold');
        githubLabel.innerText = 'Star';
        githubButton.href = `https://github.com/${encodeURIComponent(item.github.owner)}/${encodeURIComponent(item.github.repo)}`;
        githubDash.innerText = ' | ';

        const repository = github.getRepo(item.github.owner, item.github.repo)
        
        repository
          .isStarred()
          .then((starred) => {
            if (starred) {
              githubLabel.innerText = 'Unstar';
            }
          });
        
        if (item.stars) {
          countText.innerHTML = item.stars;
          githubButton.appendChild(countText);
          githubButton.appendChild(githubDash);
          itemCard.dataset.stars = item.stars;
        }

        githubButton.appendChild(githubLabel);
        itemButtons.appendChild(githubButton);
      }

			itemButtons.classList.add('footer');

      itemCard.dataset.score = item.score;

			itemLink.appendChild(itemName);
			itemCard.appendChild(itemLogoBox);
			itemCard.appendChild(itemLink);
			itemCard.appendChild(itemDesc);
			itemCard.appendChild(itemButtons);
			target.appendChild(itemCard);
		});
};
