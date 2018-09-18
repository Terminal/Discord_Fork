import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Intro from '../Intro'
import Footer from '../Footer'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'

export default ({ children }) => (
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
      <div className="main-window">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <link rel="manifest" href="/manifest.json"></link>
        </Helmet>
        <Intro />
        <div className="main-content-container container">
          {children}
        </div>
        <Footer />
      </div>
    )}
  />
)