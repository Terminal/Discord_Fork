import React from 'react';
import './style.scss'


export default class Navigation extends React.Component {
  componentDidMount() {
    this.open.addEventListener('click', () => {
      this.navside.style.transform = 'translateX(0px)'
    })

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container')) {
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
            <a href="/docs/">
              Documentation
            </a>
          </h4>
        </div>
      
        <div ref={elem => this.navside = elem} className="sidenav" style={({transform: 'translateX(-250px)'})}>
          <a href="/">Back to Forklist</a>
          <a href="/docs/">Documentation</a>
          <a href="/cms/">CMS</a>
        </div>
      </div>
    )
  }
}
