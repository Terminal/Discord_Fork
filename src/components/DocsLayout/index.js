import React from 'react'

import Navigation from '../Navigation'
import Footer from '../Footer'
import Global from '../Global'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'
import './index.scss'

export default ({ children }) => (
  <div className="main-window">
    <Global />
    <Navigation />
    <div className="main-content-container container">
      {children}
    </div>
    <Footer />
  </div>
)
