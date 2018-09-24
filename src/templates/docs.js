import React from 'react';
import Global from './../components/Global'
import DocsLayout from './../components/DocsLayout'
import { graphql } from "gatsby"

import './docs.scss'

export default ({data, pageContext}) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <DocsLayout locale={pageContext.locale}>
      <Global title={frontmatter.pagename} description={frontmatter.description}/>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </DocsLayout>
  )
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
`
