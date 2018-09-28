import React from 'react';
import './style.scss';
import Avatar from './../Avatar';

export default ({ post }) => {
  // const githubButton = post.frontmatter.github && post.frontmatter.github.owner && post.frontmatter.github.repo ? <a href={`https://github.com/${post.frontmatter.github.owner}/${post.frontmatter.github.repo}`} rel="noopener" target="_blank">GitHub</a> : null;

  return (
    <section className="card profile">
      <div className="avatar">
        <Avatar post={post}></Avatar>
      </div>
      <div className="card-content">
        <h1 className="name">
          {post.frontmatter.pagename}
          { post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
        </h1>
        <span className="description">{post.frontmatter.description}</span>
      </div>
    </section>
  );
};
