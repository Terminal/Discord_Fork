import React from 'react'
import styles from './styles.module.scss'

const TransportSign = ({ children }) => {
  return (
    <div className={styles.links}>
      {children}
    </div>
  )
}

export default TransportSign
