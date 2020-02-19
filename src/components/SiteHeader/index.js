import React from 'react'
import styles from './styles.module.scss'
import SitePadSides from '../SitePadSides'

const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <SitePadSides>
        <span>DiscordFork</span>
      </SitePadSides>
    </header>
  )
}

export default SiteHeader
