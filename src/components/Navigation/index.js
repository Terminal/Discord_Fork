import React from 'react';
import './style.scss'
import Link from 'gatsby-link'

export default class Navigation extends React.Component {
  componentDidMount() {
    this.open.addEventListener('click', () => {
      if (this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(0px)'
      }
    })

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container') && this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(-250px)'
      }
    })
  }

  render() {
    return (
      <div className="nav-container">
        <span ref={elem => this.open = elem} id="menu-icon"></span>
      
        <div className="nav-content">
          <h4 className="center">
            <Link to="/docs/">
              { this.props.title || 'Documentation' }
            </Link>
          </h4>
        </div>
      
        <div ref={elem => this.navside = elem} className="sidenav" style={({transform: 'translateX(-250px)'})}>
          <Link to="/">Back to Forklist</Link>
          <Link to="/docs/">Documentation</Link>
        </div>
      </div>
    )
  }
}
