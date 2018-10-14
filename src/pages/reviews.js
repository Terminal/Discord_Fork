import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from './../proptypes';
import Card from './../components/Card';
import Cards from './../components/Cards';
import SiteLayout from './../components/SiteLayout';
import Global from './../components/Global';
import { graphql } from 'gatsby';

export default class ServerHomepage extends React.Component {
  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale} type="reviews">
        <Global />
        <Cards>
          { this.props.data.allMarkdownRemark.edges.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
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
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {fields: {template: { eq: "reviews" }}}
    ) {
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
            date
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
