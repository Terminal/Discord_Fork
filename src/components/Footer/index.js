import React from 'react';
import Link from 'gatsby-link'

export default () => (
  <footer className="box-container primary-flat no-border-radius no-margin">
    <div className="center">
      <Link className="btn white black-text bold" to="/">Bots</Link>
      <hr />
      <p>
        <a href="https://github.com/Terminal/Discord_Fork/blob/master/LICENCE">Licence</a> |
        <Link to="/docs/attribution">Attribution</Link> |
        <a href="https://github.com/Terminal/Discord_Fork">Source Code</a> |
        <a href="https://discord.gg/8uC6aKZ" target="_blank" rel="noopener noreferrer">Terminal.ink Discord</a>
      </p>
    </div>
  </footer>
);
