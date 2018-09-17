import React from 'react'
import Card from './../components/Card'
import Cards from './../components/Cards'
import SiteLayout from './../components/SiteLayout'
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={({
      allMarkdownRemark: {
        edges
      }
    }) => (
      <SiteLayout>
        <Cards>
          {edges
            .map((edge) => {
              edge.score = Math.random()
              if (edge.node.frontmatter.github) edge.score += 1;
              return edge
            })
            .sort((a, b) => b.score - a.score)
            .map(edge => <Card key={edge.node.id} post={edge.node}/>)}
        </Cards>
      </SiteLayout>
    )}
  />
)
