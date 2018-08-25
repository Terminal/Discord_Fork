const GitHub = require('github-api');
const { showModal, closeModal } = require('./modals');

/**
 * Create a box for a card with the avatar
 * @param {String} link The location of the avatar image
 * @param {Boolean} nsfw Whether or not the bot is NSFW or not
 */
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

/**
 * Create the content section of a card.
 * @param {String} name 
 * @param {String} desc 
 * @param {String} type 
 * @param {String} id 
 * @param {Boolean} nsfw 
 */
const createContentBox = (name, desc, type, id, nsfw) => {
  const siteLang = document.documentElement.getAttribute('lang');
  const contentBox = document.createElement('div');
  const titleLink = document.createElement('a');
  const title = document.createElement('h4');
  const description = document.createElement('span');

  contentBox.classList.add('card-content')
  
  title.classList.add('title');
  description.classList.add('description');

  if (siteLang !== 'en') {
    titleLink.setAttribute('href', `/${siteLang}/${type}/${id}`);
  } else {
    titleLink.setAttribute('href', `/${type}/${id}`);
  }
  
  title.innerText = name;
  description.innerText = desc;

  if (nsfw) {
    const nsfwBadge = document.createElement('span');
    nsfwBadge.innerText = appdata.strings.list.nsfw;
    nsfwBadge.classList.add('nsfw-tag');
    title.appendChild(nsfwBadge);
  }

  titleLink.appendChild(title);
  contentBox.appendChild(titleLink);
  contentBox.appendChild(description);

  return contentBox;
};

/**
 * Create a button which will bring up the bot modal
 * and a Discord invite popup
 * @param {String} link The link in which to pop up
 */
const createBotInviteModalButton = (link) => {
  const itemInvite = document.createElement('a');

  itemInvite.innerText = appdata.strings.list.invite;
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

/**
 * Create a button which links to the ban page
 * @param {String} id The ID of the ban ID
 */
const createBansInviteButton = (id) => {
  const itemInvite = document.createElement('a');

  itemInvite.innerText = 'View Ban';
  itemInvite.setAttribute('href', `/${type}/${id}`);

  return itemInvite;
};

/**
 * Link to a generic link
 * @param {String} link The link to link to
 */
const createGenericInviteButton = (link) => {
  const itemInvite = document.createElement('a');

  itemInvite.innerText = appdata.strings.list.visit;
  itemInvite.setAttribute('href', link);

  return itemInvite;
};

/**
 * Create a button which links to GitHub.
 * Opens in a new window.
 * @param {String} owner Owner of the GitHub repository
 * @param {String} repo The repository in the owner's GitHub
 * @param {String} text The text to display
 */
const createViewGitHubButton = (owner, repo, text) => {
  const githubButton = document.createElement('a');

  githubButton.innerText = text || appdata.strings.list.github;
  githubButton.setAttribute('href' ,`https://github.com/${owner}/${repo}`);
  githubButton.setAttribute('target', '_blank');

  return githubButton;
};

/**
 * Create a button which a user can interact with.
 * Can accept extra classes to change it into a ModestaCSS Button
 * @param {String} owner Owner of the GitHub repository
 * @param {String} repo The repository in the owner's GitHub
 * @param {Number} stars The number of stars at the moment
 * @param {String} classItems Things to add to the class of the link
 * @param {GitHub} github The GitHub object
 */
const createToggleStarButton = (owner, repo, stars, classItems, github) => {
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
          starLabel.innerText = appdata.strings.list.unstar;
        } else {
          starLabel.innerText = appdata.strings.list.star;
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
                starLabel.innerText = appdata.strings.list.star;
                starCount.innerText = parseInt(starCount.innerText, 10) - 1;
              });
          } else {
            repository
              .star()
              .then(() => {
                starStatus = true;
                starLabel.innerText = appdata.strings.list.unstar;
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

/**
 * Create a button that looks like it would star, but
 * it actually just shows a modal to login...
 * Because the user may need to login.
 */
const createLoginThenStarButton = () => {
  const githubButton = document.createElement('a');

  githubButton.innerText = appdata.strings.list.star;
  githubButton.setAttribute('href', '#');

  githubButton.addEventListener('click', () => {
    showModal('login-modal');
  });

  return githubButton;
};

/**
 * Export it all
 */
module.exports = {
  createAvatarBox,
  createContentBox,
  createBotInviteModalButton,
  createBansInviteButton,
  createGenericInviteButton,
  createViewGitHubButton,
  createToggleStarButton,
  createLoginThenStarButton
};
