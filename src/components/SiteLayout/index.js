import React from 'react';
import PropTypes from 'prop-types';

import Intro from '../Intro';
import Footer from '../Footer';
import GlobalLayout from '../GlobalLayout';

class SiteLayout extends React.Component {
  render() {
    return (
      <GlobalLayout locale={this.props.locale}>
        <Intro type={this.props.type} image={this.props.image} />
        <div className="main-content-container container">
          {this.props.children}
        </div>
        <Footer />
      </GlobalLayout>
    );
  }
}

SiteLayout.propTypes = {
  children: PropTypes.any,
  locale: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string
};

export default SiteLayout;
