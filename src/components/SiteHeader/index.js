import React from 'react'
import styles from './styles.module.scss'
import SitePadSides from '../SitePadSides'
import { Link } from 'gatsby'

const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <SitePadSides className={styles.container}>
        <span className={styles.title}>DiscordFork</span>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <a href="#noop"><span role="img" aria-label="Magnifying Glass Emoji">🔍</span> Search</a>
          <a href="#noop">Login</a>
        </div>
      </SitePadSides>
    </header>
  )
}

export default SiteHeader
