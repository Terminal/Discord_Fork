import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation';
import Footer from '../Footer';
import GlobalLayout from '../GlobalLayout';

import './index.scss';

class DocsLayout extends React.Component {
  render() {
    return (
      <GlobalLayout locale={this.props.locale}>
        <Navigation />
        <div className="main-content-container container">
          {this.props.children}
        </div>
        <Footer />
      </GlobalLayout>
    );
  }
}

DocsLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string
};

export default DocsLayout;
