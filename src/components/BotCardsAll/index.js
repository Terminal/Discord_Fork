import React from 'react'
import BotCards from "../BotCards"
import { StaticQuery, graphql } from 'gatsby'

const BotCardsAll = ({
  filter = () => true,
  limit = 0,
}) => (
  <StaticQuery query={graphql`
    query {
      allBotsJson {
        nodes {
          images {
            avatar {
              childImageSharp {
                fluid(fit: COVER, maxWidth: 128, maxHeight: 128) {
                  # Do not use "_withWebp"
                  # https://github.com/gatsbyjs/gatsby/issues/14497
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          id
          contents {
            name
          }
          categories
          nsfw
        }
      }
    }
  `}
  render={(data) => {
    const bots = data.allBotsJson.nodes
      .filter(filter)
      .filter((a, index) => {
        if (limit) return index < limit;
        return true;
      })

    return (
      <BotCards bots={bots} />
    )
  }} />
)

export default BotCardsAll
