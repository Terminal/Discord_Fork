import React from 'react'
import BotCard from "../BotCard"
import { StaticQuery, graphql } from 'gatsby'

import styles from './styles.module.scss';

const BotCards = () => (
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
          nsfw
        }
      }
    }
  `}
  render={(data) => {
    const bots = data.allBotsJson.nodes
    return (
      <div className={styles.cards}>
        {bots.map(bot => <BotCard bot={bot} key={bot.id} />)}
      </div>
    )
  }} />
)



export default BotCards
