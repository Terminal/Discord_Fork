import React from 'react'
import SiteHeader from "../SiteHeader"
import SiteFooter from '../SiteFooter'

const SiteLayout = ({ children, data }) => {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}


export default SiteLayout
