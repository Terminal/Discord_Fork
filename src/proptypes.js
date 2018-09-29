import PropTypes from 'prop-types';

export const ItemPropType = PropTypes.shape({
  frontmatter: PropTypes.shape({
    nsfw: PropTypes.bool,
    pagename: PropTypes.string,
    application_id: PropTypes.string,
    server_id: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    support: PropTypes.string,
    github: PropTypes.shape({
      owner: PropTypes.string,
      repo: PropTypes.string
    })
  }),
  fields: PropTypes.shape({
    permalink: PropTypes.string,
    filelink: PropTypes.string,
    locale: PropTypes.string,
    template: PropTypes.string,
    filename: PropTypes.string
  }),
  html: PropTypes.string
});
