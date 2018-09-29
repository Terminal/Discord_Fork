import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocalLink from '../LocalLink';

class Footer extends React.Component {
  render() {
    return (
      <footer className="box-container primary-flat no-border-radius no-margin">
        <div className="center">
          <LocalLink className="btn white black-text bold" to="/">
            <FormattedMessage id="pages.bots.shortname" />
          </LocalLink>
          <LocalLink className="btn white black-text bold" to="/docs">
            <FormattedMessage id="pages.docs.shortname" />
          </LocalLink>
          <hr />
          <p>
            {/* Use a full width Vertical pipe: `｜` */}
            <a href="https://github.com/Terminal/Discord_Fork/blob/master/LICENCE">
              <FormattedMessage id="footer.licence" />
            </a>｜
            <LocalLink to="/docs/attribution">
              <FormattedMessage id="footer.attribution" />
            </LocalLink>｜
            <a href="https://github.com/Terminal/Discord_Fork">
              <FormattedMessage id="footer.source" />
            </a>｜
            <a href="https://discord.gg/8uC6aKZ" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.terminal" />
            </a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;