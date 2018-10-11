import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class CarouselImage extends React.Component {
  render() {
    return (
      <section className="carousel-image">
        <img src={this.props.src}></img>
      </section>
    );
  }
}

CarouselImage.propTypes = {
  src: PropTypes.string
};

export default CarouselImage;
