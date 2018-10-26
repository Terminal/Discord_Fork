import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import Loading from './../components/Loading';
import { graphql } from 'gatsby';

export default class BotsHomepage extends React.Component {
  constructor(props) {
    super(props);

    this.shuffleTheBots = this.shuffleTheBots.bind(this);
    this.searchBoxChange = this.searchBoxChange.bind(this);

    if (typeof window === 'undefined') {
      this.state = {
        shuffle: this.shuffleTheBots(),
        display: this.shuffleTheBots()
      };
    } else {
      this.state = {
        shuffle: [],
        display: [],
      };
    }
  }

  shuffleTheBots() {
    const seen = {};
    return this.props.data.allMarkdownRemark.edges.map((edge) => {
      edge.score = Math.random();
      if (edge.node.frontmatter.github) edge.score += 1;
      if (edge.node.fields.locale === this.props.pageContext.locale) edge.score += 10;
      return edge;
    })
      .sort((a, b) => b.score - a.score)
      .filter((item) => {
        if (seen.hasOwnProperty(item.node.fields.filename)) {
          return false;
        }
        seen[item.node.fields.filename] = true;
        return true;
      });
  }

  searchBoxChange(e) {
    const target = e.target;
    if (target.value === '') {
      this.setState({
        display: this.state.shuffle
      });
    } else {
      this.setState({
        display: this.state.shuffle.filter((item) => {
          let text = [
            item.node.frontmatter.pagename,
            item.node.frontmatter.description
          ];
  
          if (text.join(' ').toLowerCase().indexOf(target.value.toLowerCase()) === -1) return false;
          return true;
        })
      });
    }
  }

  componentDidMount() {
    const shuffle = this.shuffleTheBots();
    this.setState({
      display: shuffle,
      shuffle,
    });
  }

  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Global />
        <div className="center">
          <FormattedMessage id="intro.search">
            {((placeholder) => (
              <input placeholder={placeholder} onChange={this.searchBoxChange}></input>
            ))}
          </FormattedMessage>
        </div>
        <Cards>
          { this.state.display.length === 0 ? <Loading /> : this.state.display.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
      </SiteLayout>
    );
  }
}

BotsHomepage.propTypes = {
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
  query BotsHomepageQuery {
    allMarkdownRemark(filter: {fields: {template: { eq: "bots" }}}) {
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
