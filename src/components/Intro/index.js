import React from 'react';
import background from './background.jpg'
import Link from 'gatsby-link'
import { FormattedMessage } from 'react-intl'

export default () => (
  <section className="fullscreen half">
    <div className="background" style={({backgroundImage: `url(${background})`, backgroundColor: '#2a2a2a', height: '50vh'})}>
    </div>
    <div className="center-object">
      <div className="center-items">
        <Link to="/">
          <section className="me unset">
            <img alt="The logo for Discord_Fork" draggable="false" className="image-title" src="/assets/images/logo/logo.svg" style={({width: '7em', height: '7em'})}></img>
            <div>
              <h1 className="title no-margin white-text">
                <FormattedMessage id="pages.bots.pagename" />
              </h1>
              <span className="undertitle white-text">
              <FormattedMessage id="pages.bots.description" />
              </span>
            </div>
          </section>
        </Link>
      </div>
    </div>
  </section>
);
