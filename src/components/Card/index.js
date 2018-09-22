import React from 'react';
import Link from 'gatsby-link'
import Avatar from './../Avatar'

export default class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      render: false
    }
  }

  componentDidMount() {
    this.setState({
      render: !this.state.render
    });
  }

  render() {
    const githubButton = this.props.post.frontmatter.github
      && this.props.post.frontmatter.github.owner
      && this.props.post.frontmatter.github.repo 
        ? <a href={`https://github.com/${this.props.post.frontmatter.github.owner}/${this.props.post.frontmatter.github.repo}`} rel="noopener noreferrer" target="_blank">GitHub</a>
        : null

    return (
      <section className="card">
        <div className="avatar">
          <Avatar post={this.props.post}></Avatar>
        </div>
        <div className="card-content">
          <Link to={`/${this.props.post.fields.template}/${this.props.post.fields.filename}`}>
            <h4 className="title">
              {this.props.post.frontmatter.pagename}
              {this.props.post.frontmatter.nsfw ? <span className="nsfw-tag">NSFW</span> : null }
            </h4>
          </Link>
          <span className="description">{this.props.post.frontmatter.description}</span>
        </div>
        <div className="footer">
          <a href={this.props.post.frontmatter.link}>Invite</a>
          {githubButton}
        </div>
      </section>
    )
  }
}
