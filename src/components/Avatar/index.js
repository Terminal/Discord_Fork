import React from 'react';

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
    return (
      <img className={`avatar ${this.props.post.frontmatter.nsfw ? 'nsfw' : '' }`} alt={`Avatar for ${this.props.post.frontmatter.pagename}`} src={`/assets/${this.props.post.fields.template}/${this.props.post.fields.filename}-128.png` || '/assets/images/logo/logo.svg'} onError={(e) => {
        if (e.target.dataset.error !== '') {
          e.target.dataset.error = ''
          e.target.src = '/assets/images/logo/logo.svg'
        }
      }}></img>
    )
  }
}
