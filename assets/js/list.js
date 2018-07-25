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
			})
		})
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
      
      const createAvatarBox = (link, nsfw) => {
        const avatarBox = document.createElement('div');
        const avatar = document.createElement('img');

        avatarBox.classList.add('avatar');
        avatar.classList.add('avatar');

        avatar.src = link;

        if (nsfw) {
          avatar.classList.add('nsfw');
        }

        avatar.addEventListener('error', () => {
          avatar.src = '/assets/images/logo.png';
        });
        
        avatarBox.appendChild(avatar);
        return avatarBox;
      };

      const createContentBox = (name, desc, nsfw) => {
        const contentBox = document.createElement('div');
        const titleLink = document.createElement('a');
        const title = document.createElement('h4');
        const description = document.createElement('span');
        
        title.classList.add('title');
        description.classList.add('description');

        titleLink.setAttribute('href', `/${type}/${item.id}`);
        title.innerText = name;
        description.innerText = desc;

        if (nsfw) {
          const nsfwBadge = document.createElement('span');
          nsfwBadge.innerText = 'NSFW';
          nsfwBadge.classList.add('nsfw-tag');
          title.appendChild(nsfwBadge);
        }

        titleLink.appendChild(title);
        contentBox.appendChild(titleLink);
        contentBox.appendChild(description);

        return contentBox;
      }

      const createBotInviteModalButton = (link) => {
        const itemInvite = document.createElement('a');

        itemInvite.innerText = 'Invite';
        itemInvite.setAttribute('href', '#');
        itemInvite.addEventListener('click', (e) => {
          const discordWindow = window.open(link, '_blank', `toolbar=0,width=500,height=700,top=${Math.floor(screen.height / 2) - 250},left=${Math.floor(screen.width / 2) - 350}}`);
          // Show a modal, which closes when discordWindow closes
          showModal('invite-modal');

          const timer = setInterval(() => {
            if (discordWindow.closed) {
              clearInterval(timer);
              closeModal(null, 'invite-modal');
            }
          }, 20);
        });

        return itemInvite;
      }
      
      const createBansInviteButton = (id) => {
        const itemInvite = document.createElement('a');

        itemInvite.innerText = 'View Ban';
        itemInvite.setAttribute('href', `/${type}/${id}`);

        return itemInvite;
      }

      const createGenericInviteButton = (link) => {
        const itemInvite = document.createElement('a');

        itemInvite.innerText = 'Open';
        itemInvite.setAttribute('href', link);

        return itemInvite;
      }

      const createViewGitHubButton = (owner, repo) => {
        const githubButton = document.createElement('a');

        githubButton.innerText = 'GitHub';
        githubButton.setAttribute('href' ,`${GITHUB_URL}/${owner}/${repo}`);
        githubButton.setAttribute('target', '_blank');

        return githubButton;
      }

      const createToggleStarButton = (owner, repo) => {
        if (github) {
          const starButton = document.createElement('a');
          const repository = github.getRepo(owner, repo);
        
          // Check if the repository is starred yet
          repository
            .isStarred()
            .then((starred) => {
              let starStatus = starred;

              if (starred) {
                starButton.innerText = 'Unstar';
              } else {
                starButton.innerText = 'Star';
              }

              // Make the button toggle between states
              starButton.addEventListener('click', () => {
                if (starStatus) {
                  repository
                    .unstar()
                    .then(() => {
                      starStatus = false;
                      starButton.innerText = 'Star';
                    });
                } else {
                  repository
                    .star()
                    .then(() => {
                      starStatus = true;
                      starButton.innerText = 'Unstar';
                    });
                }
              });
            });
          return starButton;
        } else {
          // Cannot create a button without being logged in.
          throw new Error('Cannot create a toggleable GitHub button without authentication');
        }
      }

      const createLoginThenStarButton = (owner, repo) => {
        const githubButton = document.createElement('a');

        githubButton.innerText = 'Star';
        githubButton.setAttribute('href', '#');

        githubButton.addEventListener('click', () => {
          showModal('login-modal');
        });

        return githubButton;
      }

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
            buttonsBox.appendChild(createToggleStarButton(item.github.owner, item.github.repo));
          } else {
            buttonsBox.appendChild(createLoginThenStarButton());
          }
        }

        return buttonsBox;
      }

      itemCard.dataset.score = item.score;

      itemCard.appendChild(createAvatarBox(item.avatar, item.nsfw))
      itemCard.appendChild(createContentBox(item.name, item.description, item.nsfw));
			itemCard.appendChild(createButtonsBox());
			target.appendChild(itemCard);
		});
};

const checkStorage = () => {
  if (!localStorage.getItem('repos')) {
    // If it doesn't exist, create it.
    localStorage.setItem('repos', "{}");
  }
}

const getStars = (owner, repo) => {
  checkStorage();
  owner = owner.toLowerCase();
  repo = repo.toLowerCase();

  // Get information about the current bot
  const cachedInfo = JSON.parse(localStorage.getItem('repos'))[`${owner}/${repo}`];
  const repository = github.getRepo(owner, repo)

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
            [`${owner}/${repo}`]: {
              data: data.data,
              time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }
          })));
          return data.data.stargazers_count; // the number of stars the project has at this precise moment
        }
      });
  } else {
    // Use the cached data
    return cachedInfo.data.stargazers_count; // the number of stars in the cache
  }
}
