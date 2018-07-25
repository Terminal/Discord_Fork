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

const createContentBox = (name, desc, type, id, nsfw) => {
  const contentBox = document.createElement('div');
  const titleLink = document.createElement('a');
  const title = document.createElement('h4');
  const description = document.createElement('span');
  
  title.classList.add('title');
  description.classList.add('description');

  titleLink.setAttribute('href', `/${type}/${id}`);
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
};

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
};

const createBansInviteButton = (id) => {
  const itemInvite = document.createElement('a');

  itemInvite.innerText = 'View Ban';
  itemInvite.setAttribute('href', `/${type}/${id}`);

  return itemInvite;
};

const createGenericInviteButton = (link) => {
  const itemInvite = document.createElement('a');

  itemInvite.innerText = 'Open';
  itemInvite.setAttribute('href', link);

  return itemInvite;
};

const createViewGitHubButton = (owner, repo) => {
  const githubButton = document.createElement('a');

  githubButton.innerText = 'GitHub';
  githubButton.setAttribute('href' ,`${GITHUB_URL}/${owner}/${repo}`);
  githubButton.setAttribute('target', '_blank');

  return githubButton;
};

const createToggleStarButton = (owner, repo, stars, classItems) => {
  if (github) {
    const starButton = document.createElement('a');
    const starLabel = document.createElement('span');
    const starDivider = document.createElement('span');
    const starCount = document.createElement('span');
    const repository = github.getRepo(owner, repo);

    if (classItems) {
      starButton.classList.add(...classItems);
    }
  
    // Check if the repository is starred yet
    repository
      .isStarred()
      .then((starred) => {
        let starStatus = starred;

        if (starred) {
          starLabel.innerText = 'Unstar';
        } else {
          starLabel.innerText = 'Star';
        }

        starDivider.innerText = '｜';
        starCount.innerText = stars;

        // Make the button toggle between states
        starButton.addEventListener('click', () => {
          if (starStatus) {
            repository
              .unstar()
              .then(() => {
                starStatus = false;
                starLabel.innerText = 'Star';
                starCount.innerText = parseInt(starCount.innerText, 10) - 1;
              });
          } else {
            repository
              .star()
              .then(() => {
                starStatus = true;
                starLabel.innerText = 'Unstar';
                starCount.innerText = parseInt(starCount.innerText, 10) + 1;
              });
          }
        });

        starButton.appendChild(starLabel);
        starButton.appendChild(starDivider);
        starButton.appendChild(starCount);
      });

    return starButton;
  } else {
    // Cannot create a button without being logged in.
    throw new Error('Cannot create a toggleable GitHub button without authentication');
  }
};

const createLoginThenStarButton = (owner, repo) => {
  const githubButton = document.createElement('a');

  githubButton.innerText = 'Star';
  githubButton.setAttribute('href', '#');

  githubButton.addEventListener('click', () => {
    showModal('login-modal');
  });

  return githubButton;
};
