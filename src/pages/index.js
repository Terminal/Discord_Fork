import React from 'react'
import Link from 'gatsby-link'
import Card from './../components/Card'
import Cards from './../components/Cards'

const IndexPage = ({
  data: {
    allMarkdownRemark: {
      edges
    }
  }
}) => {
  const Posts = edges.map(edge => <Card key={edge.node.id} post={edge.node}/>)
  return (
    <div>
      <Cards>
        {Posts}
      </Cards>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomepageQuery {
    allMarkdownRemark(filter: {fields: {template: { eq: "bots" }}}) {
      edges {
        node {
          fields {
            filename
            template
          }
          frontmatter {
            avatar
            pagename
            description
            link
            github {
              owner
              repo
            }
          }
        }
      }
    }
  }
`
