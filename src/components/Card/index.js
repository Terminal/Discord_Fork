import React from 'react';
import Link from 'gatsby-link'
import Avatar from './../Avatar'

export default ({ post }) => {
  const githubButton = post.frontmatter.github
    && post.frontmatter.github.owner
    && post.frontmatter.github.repo 
      ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener noreferrer" target="_blank">GitHub</a>
      : null

  return (
    <section className="card">
      <div className="avatar">
        <Avatar post={post}></Avatar>
      </div>
      <div className="card-content">
        <Link to={`/${post.fields.template}/${post.fields.filename}`}>
          <h4 className="title">
            {post.frontmatter.pagename}
            {post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
          </h4>
        </Link>
        <span className="description">{post.frontmatter.description}</span>
      </div>
      <div className="footer">
        <a href={post.frontmatter.link}>Invite</a>
        {githubButton}
      </div>
    </section>
  )
}
