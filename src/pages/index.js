import React from 'react'
import Card from './../components/Card'
import Cards from './../components/Cards'
import SiteLayout from './../components/SiteLayout'
import { graphql } from "gatsby"

export default class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      shuffle: []
    }
  }

  componentDidMount() {
    const seen = {};
    const items = this.props.data.allMarkdownRemark.edges.map((edge) => {
      edge.score = Math.random()
      if (edge.node.frontmatter.github) edge.score += 1
      if (edge.node.fields.locale === this.props.pageContext.locale) edge.score += 10
      return edge
    })
    .sort((a, b) => b.score - a.score)

    const filtered = items.filter((item) => {
      if (seen.hasOwnProperty(item.node.fields.filename)) {
        return false
      }
      seen[item.node.fields.filename] = true
      return true
    })

    this.setState({
      shuffle: filtered
    });
  }

  render() {
    return (
      <SiteLayout locale={this.props.pageContext.locale}>
        <Cards>
          {this.state.shuffle.map(edge => <Card key={edge.node.fields.filename} post={edge.node}/>)}
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
            locale
            permalink
            filelink
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
