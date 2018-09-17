const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const filename = createFilePath({
      node,
      getNode,
      basePath: 'bots'
    });

    createNodeField({
      node,
      name: 'filename',
      value: filename
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`./src/templates/botList.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              filename
            }
            frontmatter {
              pagename
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
        path: `/bots${node.fields.filename}`,
        component: blogPostTemplate,
        context: {
          filename: node.fields.filename
        }, // additional data can be passed via context
      });
    });
  });
};
