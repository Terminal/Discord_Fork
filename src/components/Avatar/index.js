import React from 'react';
import { ItemPropType } from './../../proptypes';

import './index.scss';

class Avatar extends React.Component {
  render() {
    return (
      <img className={`avatar ${this.props.post.frontmatter.nsfw ? 'nsfw' : '' }`} alt={`Avatar for ${this.props.post.frontmatter.pagename}`} src={`/userassets${this.props.post.fields.filelink}-128.png` || '/assets/images/logo/logo.svg'} onError={(e) => {
        if (e.target.dataset.error !== '') {
          e.target.dataset.error = '';
          e.target.src = '/assets/images/logo/logo.svg';
        }
      }}></img>
    );
  }
}

Avatar.propTypes = {
  post: ItemPropType
};

export default Avatar;
