import React from 'react';
import { Helmet } from 'react-helmet';
import DocsLayout from './../components/DocsLayout'
import { graphql } from "gatsby"

export default ({data}) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <DocsLayout>
      <Helmet>
        <title>{frontmatter.pagename}</title>
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </DocsLayout>
  )
};

export const pageQuery = graphql`
  query docsPages($filename: String!) {
    markdownRemark(fields: { filename: { eq: $filename }}) {
      html
      frontmatter {
        pagename
      }
    }
  }
`
