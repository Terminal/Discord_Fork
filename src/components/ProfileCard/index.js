import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ItemPropType } from './../../proptypes';
import './style.scss';
import Avatar from './../Avatar';

class ProfileCard extends React.Component {
  render() {
    return (
      <section className="card profile">
        <div className="avatar">
          <Avatar post={this.props.post}></Avatar>
        </div>
        <div className="card-content">
          <h1 className="name">
            {this.props.post.frontmatter.pagename}
            {this.props.post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
          </h1>
          <span className="description">{this.props.post.frontmatter.description}</span>
          { this.props.post.frontmatter.prefix ? <p><FormattedMessage id="pages.bots.prefix" />{this.props.post.frontmatter.prefix}</p> : null }
        </div>
      </section>
    );
  }
}

ProfileCard.propTypes = {
  post: ItemPropType
};

export default ProfileCard;
