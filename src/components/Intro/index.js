import React from 'react';
import mainLogo from './../logo.png'
import background from './background.jpg'
import Link from 'gatsby-link'

export default () => (
  <section className="fullscreen half">
    <div className="background" style={({backgroundImage: `url(${background})`, backgroundColor: '#2a2a2a', height: '50vh'})}>
    </div>
    <div className="center-object">
      <div className="center-items">
        <Link to="/">
          <section className="me unset">
            <img draggable="false" className="image-title" src={mainLogo} style={({width: '7em', height: '7em'})}></img>
            <div>
              <h1 className="title no-margin white-text">
                Discord Fork Bot List
              </h1>
              <span className="undertitle white-text">The botlist with built-in GitHub integration</span>
            </div>
          </section>
        </Link>
      </div>
    </div>
  </section>
);
