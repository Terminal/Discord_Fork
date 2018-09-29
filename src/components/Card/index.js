import React from 'react';
import Link from 'gatsby-link';
import Avatar from './../Avatar';
import { FormattedMessage } from 'react-intl';
import { ItemPropType } from './../../proptypes';

import './index.scss';

class Card extends React.Component {
  render() {
    const post = this.props.post;
    const githubButton = post.frontmatter.github
      && post.frontmatter.github.owner
      && post.frontmatter.github.repo 
      ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener noreferrer" target="_blank"><FormattedMessage id="pages.list.github" /></a>
      : null;

    return (
      <section className="card">
        <div className="avatar">
          <Avatar post={post}></Avatar>
        </div>
        <div className="card-content">
          <Link to={post.fields.permalink}>
            <h4 className="title">
              {post.frontmatter.pagename}
              {post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
            </h4>
          </Link>
          <span className="description">{post.frontmatter.description}</span>
        </div>
        <div className="footer">
          <a href={post.frontmatter.link}><FormattedMessage id="pages.list.invite" /></a>
          {githubButton}
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  post: ItemPropType
};

export default Card;
