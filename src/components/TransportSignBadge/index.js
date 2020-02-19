import React from 'react'
import styles from './styles.module.scss'

const mapping = Object.assign(styles, {
  a: styles.green,
  m: styles.blue,
  b: styles.white,
  attraction: styles.brown
})

const TransportSignBadge = ({ children, type }) => {
  return (
    <span className={mapping[type]}>
      {children}
    </span>
  )
}

export default TransportSignBadge
