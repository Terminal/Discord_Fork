import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './../components/Carousel';
import CarouselCard from './../components/CarouselCard';
import { FormattedMessage } from 'react-intl';
import LocalLink from './../components/LocalLink';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import { graphql } from 'gatsby';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.shuffleTheBots = this.shuffleTheBots.bind(this);

    if (typeof window === 'undefined') {
      this.state = {
        shuffle: this.shuffleTheBots()
      };
    } else {
      this.state = {
        shuffle: []
      };
    }
  }

  shuffleTheBots() {
    const seen = {};
    const items = this.props.data.allMarkdownRemark.edges
      .filter((edge) => {
        // Only GitHub bots are allowed on the front page
        return !!edge.node.frontmatter.github;
      })
      .map((edge) => {
        edge.score = Math.random();
        if (edge.node.frontmatter.cover) edge.score += 0.2;
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
      shuffle: this.shuffleTheBots()
    });
  }

  render() {
    const items = this.state.shuffle.slice(0);

    return (
      <SiteLayout locale={this.props.pageContext.locale} type="bots">
        <Global />
        <Carousel settings={{
          dots: true,
          infinite: true,
          speed: 500,
          className: 'carousel',
          focusOnSelect: true,
          centerMode: true,
          autoplay: true,
          slidesToShow: 1,
          autoplaySpeed: 7000
        }}>
          {items.splice(0, 6).map(edge => <CarouselCard key={edge.node.fields.filename} post={edge.node}/>)}
        </Carousel>
        <h3><FormattedMessage id="pages.homepage.cool" /></h3>
        <Cards>
          { /* Lowest common multiple of 2 and 3 */}
          {items.splice(0, 6).map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
        <div className="row center-text">
          <LocalLink to="/bots" className="btn white black-text">
            <FormattedMessage id="pages.homepage.more" />
          </LocalLink>
        </div>
      </SiteLayout>
    );
  }
}

Homepage.propTypes = {
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
  query HomepageQuery {
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
            cover
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
