const path = require('path');
const mkdirp = require('mkdirp');

const config = require('../gatsby-config');

module.exports = (node) => {
  // For each folder that needs to be created
  config.siteMetadata.foldersToClear.forEach((folder) => {
    // Grab a path to that folder, and create it
    const location = path.parse(path.join(__dirname, '..', 'public', folder, node.fields.filelink));
    mkdirp.sync(location.dir);
  });
};
