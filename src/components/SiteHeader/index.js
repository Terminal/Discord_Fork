import React from 'react'
import styles from './styles.module.scss'
import SitePadSides from '../SitePadSides'

const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <SitePadSides className={styles.container}>
        <span className={styles.title}>DiscordFork</span>
        <div className={styles.links}>
          <a href="#noop">Home</a>
          <a href="#noop">🔍 Search</a>
          <a href="#noop">Login</a>
        </div>
      </SitePadSides>
    </header>
  )
}

export default SiteHeader
