const path = require('path');
const locales = require('./src/locales/index');

const filesystems = [];

const types = [
  'bots',
  'docs'
];

const foldersToClear = [
  'api',
  'userassets'
];

Object.keys(locales).forEach((lang) => {
  types.forEach((type) => {
    filesystems.push({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'data', lang, type),
        name: `${type}.${lang}`,
      },
    });
  });
});

module.exports = {
  siteMetadata: {
    title: 'Discord_Fork',
    colour: '#3498db',
    types,
    foldersToClear,
    authenticate: 'https://github.com/login/oauth/authorize?client_id=6fff2201b71ad2d63131&scope=public_repo',
    gatekeeper: 'https://auth.discordbots.co.uk/authenticate'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    ...filesystems,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer'
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify'
  ],
};
