import React from 'react';

export default ({ post }) => {
  return (
    <img className={`avatar ${post.frontmatter.nsfw ? 'nsfw' : '' }`} alt={`Avatar for ${post.frontmatter.pagename}`} src={`/assets/${post.fields.template}/${post.fields.filename}-128.png` || '/assets/images/logo/logo.svg'} onError={(e) => {
      if (e.target.dataset.error !== '') {
        e.target.dataset.error = ''
        e.target.src = '/assets/images/logo/logo.svg'
      }
    }}></img>
  )
}