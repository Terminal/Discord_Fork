import Img from 'gatsby-image'
import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'gatsby'

const BotCard = ({ bot }) => {
  return (
    <Link to={`/bots/${bot.id}`}>
      <div className={styles.container}>
        {
          bot.images.avatar && !bot.nsfw ?
          <Img className={styles.avatar} fluid={bot.images.avatar.childImageSharp.fluid} /> :
          <div className={styles.missingAvatar} />
        }
        <div className={styles.bottom}>
          <span className={styles.name}>{bot.contents[0] && bot.contents[0].name}</span>
        </div>
      </div>
    </Link>
  )
}

export default BotCard
