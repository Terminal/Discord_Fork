import React from 'react';
import { Link } from 'gatsby';
import SiteLayout from './../components/SiteLayout';
import { FormattedMessage } from 'react-intl';
import locales from '../locales';
import './locale.scss';

export default ({pageContext}) => (
  <SiteLayout locale={pageContext.locale}>
    <div className="center">
      <h1>
        <FormattedMessage id="pages.locale.choose" />
      </h1>
      {Object.keys(locales).map((key) => (
        <Link to={locales[key].default ? '' : locales[key].path}>
          <i className={`fork-locale-button emoji ${locales[key].flag}`}></i>
        </Link>
      ))}
    </div>
  </SiteLayout>
);
