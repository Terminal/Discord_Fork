import React from 'react';

import Navigation from '../Navigation';
import Footer from '../Footer';
import GlobalLayout from '../GlobalLayout';

import './index.scss';

export default ({ children, locale }) => (
  <GlobalLayout locale={locale}>
    <Navigation />
    <div className="main-content-container container">
      {children}
    </div>
    <Footer />
  </GlobalLayout>
);
