const path = require('path')
const mkdirp = require('mkdirp')

const config = require('../gatsby-config')

module.exports = (node) => {
  config.siteMetadata.foldersToClear.forEach((folder) => {
    const location = path.parse(path.join(__dirname, '..', 'public', folder, node.fields.filelink))
    mkdirp.sync(location.dir)
  })
}
