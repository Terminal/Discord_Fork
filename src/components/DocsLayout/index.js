import React from 'react'

import Navigation from '../Navigation'
import Footer from '../Footer'
import Global from '../Global'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'
import './index.scss'

export default () => (
  <div className="main-window">
    <Global />
    <Navigation title={this.props.title}/>
    <div className="main-content-container container">
      {this.props.children}
    </div>
    <Footer />
  </div>
)