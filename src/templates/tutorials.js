import React from 'react';
import PropTypes from 'prop-types';
import { ItemPropType } from './../proptypes';
import Global from './../components/Global';
import TutorialsLayout from './../components/TutorialsLayout';
import { graphql } from 'gatsby';

import './docs.scss';

class Docs extends React.Component {
  render() {
    return (
      <TutorialsLayout locale={this.props.pageContext.locale}>
        <Global title={this.props.data.markdownRemark.frontmatter.pagename} description={this.props.data.markdownRemark.frontmatter.description}/>
        <div dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }}></div>
      </TutorialsLayout>
    );
  }
}

export const pageQuery = graphql`
  query tutorialPages($filelink: String!) {
    markdownRemark(fields: { filelink: { eq: $filelink }}) {
      html
      frontmatter {
        pagename
        description
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
