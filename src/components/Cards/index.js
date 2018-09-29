import React from 'react';
import PropTypes from 'prop-types';

class Cards extends React.Component {
  render() {
    return (
      <div className="center-text card-container">
        {this.props.children}
      </div>
    );
  }
}

Cards.propTypes = {
  children: PropTypes.any
};

export default Cards;
