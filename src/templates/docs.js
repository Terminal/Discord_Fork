import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from './../proptypes';
import Global from './../components/Global';
import DocsLayout from './../components/DocsLayout';
import { graphql } from 'gatsby';

import './docs.scss';

class Docs extends React.Component {
  render() {
    return (
      <DocsLayout locale={this.props.pageContext.locale}>
        <Global title={this.props.data.markdownRemark.frontmatter.pagename} description={this.props.data.markdownRemark.frontmatter.description}/>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }}></div>
      </DocsLayout>
    );
  }
}

export const pageQuery = graphql`
  query docsPages($filelink: String!) {
    markdownRemark(fields: { filelink: { eq: $filelink }}) {
      html
      frontmatter {
        pagename
      }
      fields {
        filename
      }
    }
  }
`;

Docs.propTypes = {
  data: PropTypes.shape({
    markdownRemark: ItemPropType
  }),
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default Docs;
