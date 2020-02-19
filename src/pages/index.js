import React from 'react';
import BotCards from "../components/BotCards";
import SiteLayout from "../components/SiteLayout";
import SiteSEO from "../components/SiteSEO";
import SitePadSides from "../components/SitePadSides";

const IndexPage = () => {
  return (
    <SiteLayout>
      <SiteSEO title="Home" />
      <SitePadSides>
        <BotCards />
      </SitePadSides>
    </SiteLayout>
  )
}

export default IndexPage
