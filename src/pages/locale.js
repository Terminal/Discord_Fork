import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import SiteLayout from './../components/SiteLayout';
import Global from './../components/Global';
import { FormattedMessage } from 'react-intl';
import locales from '../locales';
import './locale.scss';

class Locale extends React.Component {
  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Global />
        <div className="center">
          <h1>
            <FormattedMessage id="pages.locale.choose" />
          </h1>
          {Object.keys(locales).map((key) => (
            <Link to={locales[key].default ? '' : locales[key].path} key={key}>
              <i className={`fork-locale-button emoji ${locales[key].flag}`}></i>
            </Link>
          ))}
        </div>
      </SiteLayout>
    );
  }
}

Locale.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default Locale;
