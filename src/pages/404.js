import React from 'react'
import SiteLayout from './../components/SiteLayout'
import LocalLink from './../components/LocalLink'
import { FormattedMessage } from 'react-intl'

const NotFoundPage = ({pageContext}) => (
  <SiteLayout locale={pageContext.locale}>
    <div className="center">
      <h1>
        404<br />
        <FormattedMessage id="pages.notfound.message" />
      </h1>
      <LocalLink to="/">
        <FormattedMessage id="pages.notfound.gohome" />
      </LocalLink>
    </div>
  </SiteLayout>
)

export default NotFoundPage
