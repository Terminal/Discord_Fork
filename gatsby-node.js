const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const mustache = require('mustache')
const wrap = require('word-wrap')

const downloadImages = require('./node/downloadImages')
const makeSureTheFoldersExistBeforeWritingYourFiles = require('./node/makeSureTheFoldersExistBeforeWritingYourFiles')

const locales = require('./src/locales/index')
const config = require('./gatsby-config')

const embedTemplate = fs.readFileSync(path.join(__dirname, 'embed.svg'), 'utf8');

// Destroy existing folders before starting
exports.onPreBootstrap = () => {
  config.siteMetadata.foldersToClear
    .forEach((location) => {
      if (fs.existsSync(path.resolve('public', location))) {
        rimraf.sync(path.resolve('public', location))
      }
    })
  return;
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: 'filename',
      value: parent.name
    })

    const parts = parent.dir.split('/')

    const localizedPath = locales[parts[parts.length - 2]].default
      ? ''
      : '/' + locales[parts[parts.length - 2]].path

    createNodeField({
      node,
      name: 'locale',
      value: parts[parts.length - 2]
    })

    createNodeField({
      node,
      name: 'template',
      value: parts[parts.length - 1]
    })

    createNodeField({
      node,
      name: 'permalink',
      value: `${localizedPath}/${parts[parts.length - 1]}/${parent.name === 'index' ? '' : parent.name}`
    })

    createNodeField({
      node,
      name: 'filelink',
      value: `${localizedPath}/${parts[parts.length - 1]}/${parent.name}`
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const templates = {
    bots: path.resolve(`./src/templates/bots.js`),
    docs: path.resolve('./src/templates/docs.js')
  }

  // Render all pages in React
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              filename
              template
              locale
              permalink
              filelink
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.permalink,
        component: templates[node.fields.template],
        context: node.fields
      })
    })
  })
  
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              permalink
              filelink
            }
            frontmatter {
              application_id
              avatar
              pagename
              description
              link
              support
              nsfw
              github {
                owner
                repo
              }
            }
            html
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      makeSureTheFoldersExistBeforeWritingYourFiles(node)
      downloadImages(node)
      fs.writeFileSync(path.join(__dirname, 'public', 'api', `${node.fields.filelink}.json`), JSON.stringify(node, null, 2));
      fs.writeFileSync(path.join(__dirname, 'public', 'api', `${node.fields.filelink}.json`), mustache.render(embedTemplate, Object.assign(node, {
        wrapped: wrap(node.frontmatter.description || '', { width: 35 }).split('\n').map(line => line.trim())
      })))
    })
  })

  return
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    deletePage(page)

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      })
    })

    resolve()
  })
}

exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{
          test: /monaco-editor/,
          use: loaders.null()
        }]
      }
    })
  }
}
