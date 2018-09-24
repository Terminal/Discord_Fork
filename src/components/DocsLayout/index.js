import React from 'react'

import Navigation from '../Navigation'
import Footer from '../Footer'
import GlobalLayout from '../GlobalLayout'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'
import './index.scss'

export default ({ children, locale }) => (
  <GlobalLayout locale={locale}>
    <Navigation />
    <div className="main-content-container container">
      {children}
    </div>
    <Footer />
  </GlobalLayout>
)
