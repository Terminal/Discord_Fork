import React from 'react'
import SiteHeader from "../SiteHeader"
import SiteFooter from '../SiteFooter'
import styles from './styles.module.scss'

import '../../scss/global.scss';

const SiteLayout = ({ children, data, gap = true }) => {
  return (
    <div className={`${styles.layout} ${gap && styles.gap}`}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}


export default SiteLayout
