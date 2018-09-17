import React from 'react';
import mainLogo from './../logo.png'
import './style.scss'

export default ({ post }) => {
  // const githubButton = post.frontmatter.github && post.frontmatter.github.owner && post.frontmatter.github.repo ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener" target="_blank">GitHub</a> : null;

  return (
    <section className="card profile">
      <div className="avatar">
        <img className="avatar nsfw" alt={`Avatar for ${post.fields.pagename}`} src={post.frontmatter.avatar || mainLogo} onError={e => e.target.src = mainLogo}></img>
      </div>
      <div className="card-content">
        <h1 className="name">
          {post.frontmatter.pagename}
          { post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
        </h1>
        <span className="description">{post.frontmatter.description}</span>
      </div>
    </section>
  )
};
