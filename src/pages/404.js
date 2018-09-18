import React from 'react'
import SiteLayout from './../components/SiteLayout'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <SiteLayout>
    <div className="center">
      <h1>
        404<br />
        Page not found
      </h1>
      <Link to="/">Go home</Link>
    </div>
  </SiteLayout>
)

export default NotFoundPage
