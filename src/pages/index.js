import React from 'react'
import Card from './../components/Card'
import Cards from './../components/Cards'
import SiteLayout from './../components/SiteLayout'
import { graphql } from "gatsby"

export default class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      render: false
    }
  }

  componentDidMount() {
    this.setState({
      render: !this.state.render
    });
  }

  render() {
    return (
      <SiteLayout>
        <Cards>
          {this.props.data.allMarkdownRemark.edges
            .map((edge) => {
              edge.score = Math.random()
              if (edge.node.frontmatter.github) edge.score += 1;
              return edge
            })
            .sort((a, b) => b.score - a.score)
            .map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
        </Cards>
      </SiteLayout>
    )
  }
}

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
`
