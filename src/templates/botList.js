import React from 'react';
import Img from "gatsby-image";

export default function Template({data}) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <div>
      <h1>{frontmatter.pagename}</h1>
      <img src={frontmatter.avatar}></img>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
};

export const pageQuery = graphql`
  query MarkdownPages($filename: String!) {
    markdownRemark(fields: { filename: { eq: $filename }}) {
      html
      frontmatter {
        pagename,
        avatar
      }
    }
  }
`
