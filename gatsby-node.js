const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')
const mustache = require('mustache')
const wrap = require('word-wrap');

const embedTemplate = fs.readFileSync(path.join(__dirname, 'embed.svg'), 'utf8');

// Destroy existing folders before starting
exports.onPreBootstrap = () => {
  const apiPath = path.resolve('public', 'api')
  const apiBotsPath = path.resolve('public', 'api', 'bots')
  const apiDocsPath = path.resolve('public', 'api', 'docs')

  if (fs.existsSync(apiPath)) rimraf.sync(apiPath)
  if (fs.existsSync(apiBotsPath)) rimraf.sync(apiBotsPath)
  if (fs.existsSync(apiDocsPath)) rimraf.sync(apiDocsPath)

  fs.mkdirSync(apiPath)
  fs.mkdirSync(apiBotsPath)
  fs.mkdirSync(apiDocsPath)
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

    createNodeField({
      node,
      name: 'template',
      value: parent.sourceInstanceName
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
              filename,
              template
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
        path: `/${node.fields.template}/${node.fields.filename === 'index' ? '' : node.fields.filename}`,
        component: templates[node.fields.template],
        context: {
          filename: node.fields.filename
        }, // additional data can be passed via context
      })
    })
  })
  
  graphql(`
    query BotsApiQuery {
      allMarkdownRemark(filter: {fields: {template: { eq: "bots" }}}) {
        edges {
          node {
            fields {
              filename
              template
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
      fs.writeFileSync(path.join(__dirname, 'public', 'api', 'bots', `${node.fields.filename}.json`), JSON.stringify(node, null, 2));
      fs.writeFileSync(path.join(__dirname, 'public', 'api', 'bots', `${node.fields.filename}.svg`), mustache.render(embedTemplate, Object.assign(node, {
        wrapped: wrap(node.frontmatter.description || '', { width: 35 }).split('\n').map(line => line.trim())
      })));
    })
  })

  return
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
