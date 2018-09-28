import React from 'react';

import Intro from '../Intro';
import Footer from '../Footer';
import GlobalLayout from '../GlobalLayout';

export default ({ locale, children }) => (
  <GlobalLayout locale={locale}>
    <Intro />
    <div className="main-content-container container">
      {children}
    </div>
    <Footer />
  </GlobalLayout>
);
