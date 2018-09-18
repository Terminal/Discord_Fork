import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Navigation from '../Navigation'
import Footer from '../Footer'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'
import './index.scss'

export default class DocsLayout extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query DocsLayoutQuery {
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
            <Navigation title={this.props.title}/>
            <div className="main-content-container container">
              {this.props.children}
            </div>
            <Footer />
          </div>
        )}
      />
    )
  }
}
