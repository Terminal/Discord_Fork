const types = [
  'bots',
  'docs',
  'servers',
  'reviews',
];

const foldersToClear = [
  'api',
  'userassets'
];


module.exports = {
  siteMetadata: {
    title: 'Discord_Fork',
    colour: '#3498db',
    siteUrl: 'https://discordbots.co.uk',
    types,
    foldersToClear,
    authenticate: 'https://github.com/login/oauth/authorize?client_id=6fff2201b71ad2d63131&scope=public_repo',
    gatekeeper: 'https://auth.discordbots.co.uk/authenticate'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data`,
        name: 'pages',
      },
    },
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
    'gatsby-plugin-remove-serviceworker',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'Access-Control-Allow-Origin: *'
          ],
        }
      }
    },
    'gatsby-plugin-sitemap'
  ],
};
