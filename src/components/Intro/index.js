import React from 'react';
import background from './background.jpg';
import LocalLink from '../LocalLink';
import { FormattedMessage } from 'react-intl';
import './index.scss';

export default () => (
  <section className="fullscreen half">
    <div className="background" style={({backgroundImage: `url(${background})`, backgroundColor: '#2a2a2a', height: '50vh'})}>
    </div>
    <div className="center-object">
      <div className="center-items">
        <LocalLink to="/">
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
        </LocalLink>
      </div>
      <div className="center">
        <LocalLink className="btn white emoji-button" to="/locale">
          <span className="emoji twa-globe-showing-europe-africa"></span>
        </LocalLink>
        <LocalLink className="btn white black-text emoji-button" to="/edit">
          <FormattedMessage id="pages.bots.add" />
        </LocalLink>
      </div>
    </div>
  </section>
);
