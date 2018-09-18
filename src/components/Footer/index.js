import React from 'react';
import Link from 'gatsby-link'

export default () => (
  <footer className="box-container primary-flat no-border-radius no-margin">
    <div className="center">
      <Link className="btn white" to="/">
        <span className="black-text bold">Bots</span>
      </Link>
      <hr />
      <p>
        <a href="https://github.com/Terminal/Discord_Fork/blob/master/LICENCE">Licence</a> |
        <Link to="/docs/attribution">Attribution</Link> |
        <a href="https://github.com/Terminal/Discord_Fork">Source Code</a> |
        <a href="{{ site.data.links.discord }}" target="_blank" rel="noopener">Terminal.ink Discord</a>
      </p>
    </div>
  </footer>
);
