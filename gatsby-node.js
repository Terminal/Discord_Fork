const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'bots'
    });

    createNodeField({
      node,
      name: 'slug',
      value: `/bots${slug}`
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`./src/templates/botList.js`);

  return graphql(`
    {
      allMarkdownRemark(filter: { sourceInstanceName: { eq: "bots" } }) {
        edges {
          node {
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
        path: `/bots/${node.frontmatter.client_id}`,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};
