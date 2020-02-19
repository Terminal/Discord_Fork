/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const botPage = path.resolve('./src/templates/botPage.js');

exports.createPages = async ({ actions, graphql }) => {
  const data = await graphql(`
    query {
      allBotsJson {
        nodes {
          id
        }
      }
    }
  `)

  const bots = data.data.allBotsJson.nodes;

  bots.forEach((bot) => {
    actions.createPage({
      path: `/bots/${bot.id}`,
      component: botPage,
      context: {
        id: bot.id
      }
    })
  })
}
