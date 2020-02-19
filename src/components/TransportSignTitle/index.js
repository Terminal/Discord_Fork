import React from 'react'
import styles from './styles.module.scss'

const TransportSignTitle = ({ children }) => {
  return (
    <span className={styles.header}>
      {children}
    </span>
  )
}

export default TransportSignTitle
