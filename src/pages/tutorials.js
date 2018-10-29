import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from '../proptypes';
import Card from '../components/Card';
import Cards from '../components/Cards';
import Global from '../components/Global';
import { graphql } from 'gatsby';
import DocsLayout from '../components/DocsLayout';

class TutorialsHomepage extends React.Component {
  render() {
    return (
      <DocsLayout locale={this.props.pageContext.locale} type="servers">
        <Global />
        <Cards>
          { this.props.data.allMarkdownRemark.edges.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
      </DocsLayout>
    );
  }
}

TutorialsHomepage.propTypes = {
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

export default TutorialsHomepage;

export const pageQuery = graphql`
  query TutorialsHomepageQuery {
    allMarkdownRemark(filter: {fields: {template: { eq: "tutorials" }}}) {
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
