import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import { Link } from 'react-router-dom'

import './index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class ImageStrip extends React.Component {
  render () {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      className: 'carousel',
      focusOnSelect: true,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 7000
    };

    return (
      <Slider {...settings}>
        { this.props.children }
      </Slider>
    );
  }
}

ImageStrip.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.arrayOf(PropTypes.string)
};
