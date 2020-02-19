import React from 'react'
import styles from './styles.module.scss';

const SitePadSides = ({ children, className }) => {
  return (
    <div className={`${styles.center} ${className}`}>{children}</div>
  )
}


export default SitePadSides
