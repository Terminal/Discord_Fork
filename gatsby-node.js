const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const mustache = require('mustache');
const wrap = require('word-wrap');

const downloadImages = require('./node/downloadImages');
const makeSureTheFoldersExistBeforeWritingYourFiles = require('./node/makeSureTheFoldersExistBeforeWritingYourFiles');
const makeTheSvgIntoAPngPleaseThankYou = require('./node/makeTheSvgIntoAPngPleaseThankYou');

const locales = require('./src/locales/index');
const config = require('./gatsby-config');

let downloaded = false;

const embedTemplate = fs.readFileSync(path.join(__dirname, 'src', 'templates', 'embed.svg'), 'utf8');

// Destroy existing folders before starting
exports.onPreBootstrap = () => {
  config.siteMetadata.foldersToClear
    .forEach((location) => {
      if (fs.existsSync(path.resolve('public', location))) {
        rimraf.sync(path.resolve('public', location));
      }
    });
  return;
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const parent = getNode(node.parent);

    const parts = parent.relativeDirectory.replace(/\\/g, '/').split('/');

    const localizedPath = locales[parts[0]].default
      ? ''
      : '/' + locales[parts[0]].path;

    createNodeField({
      node,
      name: 'filename',
      value: parts[2] || parent.name
    });

    createNodeField({
      node,
      name: 'locale',
      value: parts[0]
    });

    createNodeField({
      node,
      name: 'template',
      value: parts[1]
    });

    createNodeField({
      node,
      name: 'permalink',
      value: `${localizedPath}/${parts[1]}/${parts[2] || (parent.name === 'index' ? '' : parent.name)}`
    });

    createNodeField({
      node,
      name: 'filelink',
      value: `${localizedPath}/${parts[1]}/${parts[2] || parent.name}`
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;

  const templates = {
    bots: path.resolve('./src/templates/items.js'),
    servers: path.resolve('./src/templates/items.js'),
    reviews: path.resolve('./src/templates/reviews.js'),
    docs: path.resolve('./src/templates/docs.js')
  };
  
  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              permalink
              filelink
              locale
              template
              filename
            }
            frontmatter {
              custom_path
              application_id
              avatar
              cover
              images
              pagename
              prefix
              description
              date
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
    // Have a variable to store all the "custom paths" used
    const usedPaths = [];
    
    // For each page...
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // Create the page
      createPage({
        path: node.fields.permalink,
        component: templates[node.fields.template],
        context: node.fields
      });

      // Do not re-download images during development.
      if (!downloaded) {
        // Create a folder to store userassets and API files
        makeSureTheFoldersExistBeforeWritingYourFiles(node);

        // Download the images from the page into the userassets folder
        downloadImages(node, (base64image) => {
          // With the returned base64 image, render the embed
          const svg = mustache.render(embedTemplate, Object.assign(node, {
            wrapped: wrap(node.frontmatter.description || '', { width: 30 }).split('\n').map(line => line.trim()),
            base64image
          }));
          // Make the SVG into a PNG Thank You
          makeTheSvgIntoAPngPleaseThankYou(node, svg);

          // Save the SVG itself
          fs.writeFileSync(path.join(__dirname, 'public', 'api', `${node.fields.filelink}.svg`), svg);
        });

        // Save the info into a JSON file
        fs.writeFileSync(path.join(__dirname, 'public', 'api', `${node.fields.filelink}.json`), JSON.stringify(node, null, 2));

        // If there's a custom path and it hasn't been used yet
        if (node.frontmatter.custom_path && !usedPaths.includes(node.frontmatter.custom_path) && /^[\w\d]+$/.test(node.frontmatter.custom_path)) {
          // Add it to the list of things that have been used
          usedPaths.push(node.frontmatter.custom_path);
          // And create a redirect
          createRedirect({
            fromPath: '/r/' + node.frontmatter.custom_path,
            toPath: node.fields.permalink
          });
        }
      }
    });

    // Save all edges to the `all.json` file
    fs.writeFileSync(path.join(__dirname, 'public', 'api', 'all.json'), JSON.stringify(result.data.allMarkdownRemark.edges, null, 2));

    downloaded = true;
  });

  return;
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Object.keys(locales).map(lang => {
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang
        }
      });
    });

    resolve();
  });
};

// When Gatsby makes static files, don't use webpack the monaco
exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{
          test: /monaco-editor/,
          use: loaders.null()
        }]
      }
    });
  }
};
