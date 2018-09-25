import React from 'react'
import './style.scss'
import LocalLink from '../LocalLink'
import { FormattedMessage } from 'react-intl'

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
            <FormattedMessage id="pages.bots.shortname">
              {(title) => (
                <LocalLink to="/docs/">
                  { this.props.title || title }
                </LocalLink>
              )}
            </FormattedMessage>
          </h4>
        </div>
      
        <div ref={elem => this.navside = elem} className="sidenav" style={({transform: 'translateX(-250px)'})}>
          <LocalLink to="/">
            <FormattedMessage id="pages.bots.shortname" />
          </LocalLink>
          <LocalLink to="/docs/">
            <FormattedMessage id="pages.docs.shortname" />
          </LocalLink>
        </div>
      </div>
    )
  }
}
