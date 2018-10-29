import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocalLink from '../LocalLink';

class Footer extends React.Component {
  render() {
    return (
      <footer className="box-container primary-flat no-border-radius no-margin">
        <div className="center">
          <LocalLink className="btn white black-text bold" to="/bots">
            <FormattedMessage id="pages.bots.shortname" />
          </LocalLink>
          <LocalLink className="btn white black-text bold" to="/servers">
            <FormattedMessage id="pages.servers.shortname" />
          </LocalLink>
          <LocalLink className="btn white black-text bold" to="/docs">
            <FormattedMessage id="pages.docs.shortname" />
          </LocalLink>
          <hr />
          <p>
            {/* Use a full width Vertical pipe: `｜` */}
            <a href="https://github.com/Terminal/Discord_Fork/blob/v2/LICENCE">
              <FormattedMessage id="footer.licence" />
            </a>｜
            <a href="https://github.com/Terminal/Discord_Fork/network/dependencies">
              <FormattedMessage id="footer.attribution" />
            </a>｜
            <a href="https://github.com/Terminal/Discord_Fork">
              <FormattedMessage id="footer.source" />
            </a>｜
            <a href="https://discord.gg/8uC6aKZ" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="footer.terminal" />
            </a>
          </p>
          <pre>
            <p>
              <FormattedMessage id="copyright" />
            </p>
          </pre>
        </div>
      </footer>
    );
  }
}

export default Footer;