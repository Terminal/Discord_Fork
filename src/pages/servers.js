import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import SiteLayout from './../components/SiteLayout';
import Global from './../components/Global';
import Loading from './../components/Loading';
import { graphql } from 'gatsby';

export default class ServerHomepage extends React.Component {
  constructor(props) {
    super(props);

    this.shuffleTheServers = this.shuffleTheServers.bind(this);

    if (typeof window === 'undefined') {
      this.state = {
        shuffle: this.shuffleTheServers()
      };
    } else {
      this.state = {
        shuffle: []
      };
    }
  }

  shuffleTheServers() {
    const seen = {};
    const items = this.props.data.allMarkdownRemark.edges.map((edge) => {
      edge.score = Math.random();
      if (edge.node.frontmatter.github) edge.score += 1;
      if (edge.node.fields.locale === this.props.pageContext.locale) edge.score += 10;
      return edge;
    })
      .sort((a, b) => b.score - a.score);

    const filtered = items.filter((item) => {
      if (seen.hasOwnProperty(item.node.fields.filename)) {
        return false;
      }
      seen[item.node.fields.filename] = true;
      return true;
    });

    return filtered;
  }

  componentDidMount() {
    this.setState({
      shuffle: this.shuffleTheServers()
    });
  }

  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="servers">
        <Global />
        <Cards>
          { this.state.shuffle.length === 0 ? <Loading /> : this.state.shuffle.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
      </SiteLayout>
    );
  }
}

ServerHomepage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: ItemPropType
        }).isRequired
      )
    })
  }),
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export const pageQuery = graphql`
  query ServersHomepageQuery {
    allMarkdownRemark(filter: {fields: {template: { eq: "servers" }}}) {
      totalCount
      edges {
        node {
          fields {
            filename
            template
            locale
            permalink
            filelink
          }
          frontmatter {
            avatar
            pagename
            description
            link
            nsfw
            github {
              owner
              repo
            }
          }
        }
      }
    }
  }
`;
