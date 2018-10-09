import React from 'react';
import PropTypes from 'prop-types';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import LocalLink from './../components/LocalLink';
import { FormattedMessage } from 'react-intl';

class NotFoundPage extends React.Component {
  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Global />
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
    );
  }
}

NotFoundPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default NotFoundPage;
