import React from 'react';
import mainLogo from './../logo.png'
import Link from 'gatsby-link'

export default ({ post }) => {
  const githubButton = post.frontmatter.github && post.frontmatter.github.owner && post.frontmatter.github.repo ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener" target="_blank">GitHub</a> : null;

  return (
  <section className="card">
    <div className="avatar">
      <img className="avatar nsfw" src={post.frontmatter.avatar || mainLogo} onError={e => e.target.src = mainLogo}></img>
    </div>
    <div className="card-content">
      <Link to={`/${post.fields.template}/${post.fields.filename}`}>
        <h4 className="title">{post.frontmatter.pagename}</h4>
        {/* <span className="nsfw-tag">NSFW</span> */}
      </Link>
      <span className="description">{post.frontmatter.description}</span>
    </div>
    <div className="footer">
      <a href={post.frontmatter.link}>Invite</a>
      {githubButton}
    </div>
    </section>
  )
};
