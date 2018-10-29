import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import LocalLink from '../LocalLink';
import { FormattedMessage } from 'react-intl';

class Navigation extends React.Component {
  componentDidMount() {
    this.open.addEventListener('click', () => {
      if (this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(0px)';
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container') && this.navside && this.navside.style) {
        this.navside.style.transform = 'translateX(-250px)';
      }
    });
  }

  render() {
    return (
      <div className="nav-container">
        <span ref={elem => this.open = elem} id="menu-icon"></span>
      
        <div className="nav-content">
          <h4 className="center">
            <FormattedMessage id="pages.docs.pagename">
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
            <FormattedMessage id="pages.bots.pagename" />
          </LocalLink>
          <LocalLink to="/bots/">
            <FormattedMessage id="pages.bots.shortname" />
          </LocalLink>
          <LocalLink to="/servers/">
            <FormattedMessage id="pages.servers.shortname" />
          </LocalLink>
          <LocalLink to="/tutorials/">
            <FormattedMessage id="pages.tutorials.shortname" />
          </LocalLink>
          <LocalLink to="/docs/">
            <FormattedMessage id="pages.docs.shortname" />
          </LocalLink>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  title: PropTypes.string
};

export default Navigation;
