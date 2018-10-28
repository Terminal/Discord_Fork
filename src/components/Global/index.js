import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

class Global extends React.Component {
  render() {
    return (
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
            { this.props.title ? <title>{this.props.title} - {data.site.siteMetadata.title}</title> : <title>{data.site.siteMetadata.title}</title>}
            { this.props.title ? <meta content={this.props.title} property="og:title"/> : <meta content={data.site.siteMetadata.title} property="og:title"/>}
            <meta property="og:site_name" content={data.site.siteMetadata.title}/>

            { this.props.description
              ? <meta property="og:description" content={this.props.description}/>
              : <meta property="og:description" content="Discord Bots is an open source website where you can obtain bots for your server, with GitHub integration"/>
            }
            { this.props.description
              ? <meta name="description" content={`${this.props.description} - ${data.site.siteMetadata.title}`}/>
              : <meta name="description" content={`Discord Bots is an open source website where you can obtain bots for your server, with GitHub integration - ${data.site.siteMetadata.title}`}/>
            }

            { this.props.image
              ? <meta property="og:image" content={this.props.image}/>
              : <meta property="og:image" content="/assets/images/logo/logo128.png"/>
            }
            { this.props.image
              ? <link rel="icon" type="image/x-icon" href={this.props.image}/>
              : <link rel="icon" type="image/x-icon" href="/assets/images/logo/logo64.png"/>
            }

            <link rel="manifest" href="/manifest.json"/>
            <meta name="revisit-after" content="2 days"/>
            <meta name="keywords" content="discord, bots, botlist"/>
            <meta name="theme-color" content={data.site.siteMetadata.colour}/>
            { this.props.children }
          </Helmet>
        )}
      />
    );
  }
}

Global.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default Global;
