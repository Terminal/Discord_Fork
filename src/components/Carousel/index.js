import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import { Link } from 'react-router-dom'

import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class Carousel extends React.Component {
  render () {
    return (
      <Slider {...this.props.settings}>
        { this.props.children }
      </Slider>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.arrayOf(PropTypes.string),
  settings: PropTypes.object
};
