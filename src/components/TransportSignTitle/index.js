import React from 'react'
import styles from './styles.module.scss'

const TransportSignTitle = ({ children }) => {
  return (
    <div className={styles.header}>
      {children}
    </div>
  )
}

export default TransportSignTitle
