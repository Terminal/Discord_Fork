import React from 'react';


export default function Template({data}) {
  const { markdownRemark } = data;
  const { frontMatter, html } = markdownRemark;
  return (
    <div>
      <h1>{frontMatter.pagename}</h1>
    </div>
  )
};

export const pageQuery = graphql`
  query MarkdownPages {
    markdownRemark {
      html
      frontmatter {
        pagename,
        client_id
      }
    }
  }
`
