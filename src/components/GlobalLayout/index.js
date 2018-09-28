import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import Global from '../Global';

import './../ModestaCSS/css/modesta.min.css';
import './../ModestaCSS/css/twemoji.min.css';
import './../index.scss';

import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';

import locales from '../../locales';

const messages = {};
Object.keys(locales).map((key) => messages[key] = locales[key].data);

addLocaleData([...enData, ...frData]);

export default ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <div className="main-window">
      <Global />
      {children}
    </div>
  </IntlProvider>
);
