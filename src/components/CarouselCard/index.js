import React from 'react';
import Link from 'gatsby-link';
import Avatar from './../Avatar';
import { FormattedMessage } from 'react-intl';
import { ItemPropType } from './../../proptypes';

import './index.scss';

class CarouselCard extends React.Component {
  render() {
    const post = this.props.post;
    const githubButton = post.frontmatter.github
      && post.frontmatter.github.owner
      && post.frontmatter.github.repo 
      ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener noreferrer" target="_blank"><FormattedMessage id="pages.list.github" /></a>
      : null;

    const carouselStyle = post.frontmatter.cover ? {
      backgroundImage: `url('/userassets${this.props.post.fields.filelink}-cover.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {
      backgroundColor: '#282828'
    };

    const contentStyle = post.frontmatter.cover ? {
      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(0,0,0,0.4))'
    } : null;

    return (
      <section className="carousel-item" style={carouselStyle}>
        <div className="carousel-item-content" style={contentStyle}>
          <Link to={post.fields.permalink}>
            <div className="avatar">
              <Avatar post={post}></Avatar>
            </div>
            <div className="card-content">
              <h4 className="title">
                {post.frontmatter.pagename}
                {post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
              </h4>
              <span className="description">{post.frontmatter.description}</span>
            </div>
          </Link>
          <div className="footer">
            <a href={post.fields.filelink}><FormattedMessage id="pages.list.view" /></a>
            <a href={post.frontmatter.link}><FormattedMessage id="pages.list.invite" /></a>
            {githubButton}
          </div>          
        </div>
      </section>
    );
  }
}

CarouselCard.propTypes = {
  post: ItemPropType
};

export default CarouselCard;
