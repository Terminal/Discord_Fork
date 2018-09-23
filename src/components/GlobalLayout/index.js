import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import Global from '../Global'

import './../ModestaCSS/css/modesta.min.css'
import './../index.scss'

import enData from 'react-intl/locale-data/en'
import ptData from 'react-intl/locale-data/pt'

import en from '../../locales/en.json'
import pt from '../../locales/pt.json'

const messages = {
  en,
  pt
}

addLocaleData([...enData, ...ptData])

export default ({ locale, children }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <div className="main-window">
      <Global />
      {children}
    </div>
  </IntlProvider>
)
