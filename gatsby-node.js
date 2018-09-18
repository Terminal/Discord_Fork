const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent);

    createNodeField({
      node,
      name: 'filename',
      value: parent.name
    });

    createNodeField({
      node,
      name: 'template',
      value: parent.sourceInstanceName
    });
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const templates = {
    bots: path.resolve(`./src/templates/bots.js`),
    docs: path.resolve('./src/templates/docs.js')
  }

  return graphql(`
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
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.fields.template}/${node.fields.filename === 'index' ? '' : node.fields.filename}`,
        component: templates[node.fields.template],
        context: {
          filename: node.fields.filename
        }, // additional data can be passed via context
      });
    });
  });
};

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
