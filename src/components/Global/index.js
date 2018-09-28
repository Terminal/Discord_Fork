import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

export default ({ children, title, description, image }) => (
  <StaticQuery
    query={graphql`
      query SiteLayoutQuery {
        site {
          siteMetadata {
            title
            colour
          }
        }
      }
    `}
    render={data => (
      <Helmet htmlAttributes={{ lang : 'en' }}>
        { title ? <title>{title} - {data.site.siteMetadata.title}</title> : <title>{data.site.siteMetadata.title}</title>}
        { description
          ? <meta property="og:description" content={`${description} - ${data.site.siteMetadata.title}`}></meta>
          : <meta property="og:description" content={`Discord Bots is an open source website where you can obtain bots for your server, with GitHub integration - ${data.site.siteMetadata.title}`}></meta>
        }
        { description
          ? <meta name="description" content={`${description} - ${data.site.siteMetadata.title}`}></meta>
          : <meta name="description" content={`Discord Bots is an open source website where you can obtain bots for your server, with GitHub integration - ${data.site.siteMetadata.title}`}></meta>
        }
        { image
          ? <meta property="og:image" content={image}></meta>
          : <meta property="og:image" content="/assets/images/logo/logo128.png"></meta>
        }
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="icon" type="image/x-icon" href="/assets/images/logo/logo64.png"></link>
        <meta name="revisit-after" content="2 days"></meta>
        <meta name="keywords" content="discord, bots, botlist"></meta>
        <meta name="theme-color" content={data.site.siteMetadata.colour}></meta>
        { children }
      </Helmet>
    )}
  />
);
