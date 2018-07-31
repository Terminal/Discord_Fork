const GitHub = require('github-api');

/**
 * Check if `repos` exists in the localStorage
 * @param {localStorage} localStorage The localStorage object
 */
const checkStorage = (localStorage) => {
  if (!localStorage.getItem('repos')) {
    // If it doesn't exist, create it.
    localStorage.setItem('repos', "{}");
  }
};

/**
 * Get all data about a repository
 * Uses the local cache
 * @param {GitHub} github The GitHub object
 * @param {localStorage} localStorage The localStorage object
 * @param {*} owner The owner of the GitHub repository
 * @param {*} repo The GitHub repository owned by the owner
 */
const getInfo = (github, localStorage, owner, repo) => new Promise((resolve, reject) => {
  checkStorage(localStorage);
  owner = owner.toLowerCase();
  repo = repo.toLowerCase();

  // Get information about the current bot
  const cachedInfo = JSON.parse(localStorage.getItem('repos'))[`${owner}/${repo}`];
  const repository = github.getRepo(owner, repo);

  // If the GitHub information doesn't exist, or it has expired, refetch the data
  if (!cachedInfo || (cachedInfo && cachedInfo.time < Date.now())) {
    repository
      .getDetails()
      .then((data) => {
        // If GitHub returned a message, throw the error
        if (data.message) {
          reject(data.message);
        } else if (data.data) {
          // If there is data, insert the data into the local cache, and set expiry to 12 hours.
          localStorage.setItem('repos', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('repos')), {
            [`${owner}/${repo}`]: {
              data: data.data,
              time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
            }
          })));
          resolve({
            data: data.data,
            time: Date.now() + (12 * 60 * 60 * 1000) // 12 hours
          }); // the information passed by GitHub
        }
      });
  } else {
    // Use the cached data
    resolve(cachedInfo); // the number of stars in the cache
  }
});

/**
 * Get the number of stars in a repository.
 * Uses the local cache
 * @param {GitHub} github The GitHub object
 * @param {localStorage} localStorage The localStorage object
 * @param {*} owner The owner of the GitHub repository
 * @param {*} repo The GitHub repository owned by the owner
 */
const getStars = (github, localStorage, owner, repo) => new Promise((resolve, reject) => {
  getInfo(github, localStorage, owner, repo)
    .then((data) => {
      resolve(data.data.stargazers_count);
    })
    .catch(reject);
});

module.exports = {
  checkStorage,
  getInfo,
  getStars
};
