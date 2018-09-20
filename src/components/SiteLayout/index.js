import React from 'react'

import Intro from '../Intro'
import Footer from '../Footer'
import Global from '../Global'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'

export default ({ children }) => (
  <div className="main-window">
    <Global />
    <Intro />
    <div className="main-content-container container">
      {children}
    </div>
    <Footer />
  </div>
)
