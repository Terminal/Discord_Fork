import React from 'react';
import Helmet from 'react-helmet';
import { ItemPropType } from './../../proptypes';

class ItemSchema extends React.Component {
  render() {
    const item = this.props.item;
    const json = {
      '@context': 'http://schema.org/',
      '@type': 'SoftwareApplication',
      name: item.frontmatter.pagename,
      operatingSystem: 'Microsoft Windows, GNU/Linux, Apple Macintosh or any HTML5 browser.',
      installUrl: item.frontmatter.link,
      description: item.frontmatter.description,
      url: item.frontmatter.permalink,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP'
      },
    };

    if (item.fields.template === 'bots') {
      json.applicationCategory = 'Discord Chat Bot';
      json.installUrl = `https://discordapp.com/oauth2/authorize?client_id=${item.frontmatter.application_id || item.fields.filename}&scope=bot`;
    } else if (item.fields.template === 'servers') {
      json.applicationCategory = 'Discord Server';
      json.installUrl = item.frontmatter.link;
    }

    return (
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(json, null, 2)}
        </script>
      </Helmet>
    );
  }
}

ItemSchema.propTypes = {
  item: ItemPropType
};

export default ItemSchema;
