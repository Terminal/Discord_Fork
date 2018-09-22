import React from 'react';
import Global from './../components/Global'
import DocsLayout from './../components/DocsLayout'
import { graphql } from "gatsby"

export default ({data}) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <DocsLayout>
      <Global title={frontmatter.pagename} description={frontmatter.description}/>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </DocsLayout>
  )
}

export const pageQuery = graphql`
  query docsPages($filename: String!) {
    markdownRemark(fields: { filename: { eq: $filename }}) {
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
