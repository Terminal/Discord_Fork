import React from 'react';
import Helmet from 'react-helmet'
import config from '../config.json'
import { StaticQuery, graphql } from "gatsby"

export default class Global extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteLayoutQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <link rel="manifest" href="/manifest.json"></link>
            <meta name="theme-color" content={config.colour}></meta>
          </Helmet>
        )}
      />
    )
  }
}