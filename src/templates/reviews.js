import React from 'react';
import PropTypes from 'prop-types';

import { ItemPropType } from './../proptypes';
import Global from './../components/Global';
import SiteLayout from './../components/SiteLayout';
import { graphql } from 'gatsby';

import './item.scss';

class Reviews extends React.Component {
  render() {
    const { markdownRemark } = this.props.data;
    const { frontmatter, fields, html } = markdownRemark;

    return (
      <SiteLayout locale={this.props.pageContext.locale} type={fields.template} image={frontmatter.cover ? `/userassets/${fields.template}/${fields.filename}-cover.png` : null}>
        <Global title={frontmatter.pagename} description={frontmatter.description} image={`/userassets/${fields.template}/${fields.filename}-256.png`} />
        <h1>{frontmatter.pagename}</h1>
        <div className="custom-content" dangerouslySetInnerHTML={{ __html: html }}></div>
      </SiteLayout>
    );
  }
}

Reviews.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      node: ItemPropType
    })
  }),
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
};

export default Reviews;

export const pageQuery = graphql`
  query Reviews($filelink: String!) {
    markdownRemark(fields: { filelink: { eq: $filelink }}) {
      html
      frontmatter {
        pagename
        avatar
        images
        cover
        description
        nsfw
        link
        support
        prefix
        github {
          owner
          repo
        }
      }
      fields {
        filename
        template
        filelink
      }
    }
  }
`;
