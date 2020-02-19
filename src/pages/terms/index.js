import React from 'react';
import SiteLayout from "../../components/SiteLayout";
import SitePadSides from "../../components/SitePadSides";
import SiteSEO from "../../components/SiteSEO";

const TermsPage = () => {
  return (
    <SiteLayout>
      <SiteSEO title="Home" />
      <SitePadSides>
        <h1>Terms and Conditions</h1>
        <p>
          Thanks for choosing this website to browse on.
        </p>
        <h2>External Links</h2>
        <p>
          This website may link to sites outside our control.
          We cannot be held responsible for the content on other websites.
          If you find a link which may be inappropriate, please submit an issue in our GitHub repository.
        </p>
      </SitePadSides>
    </SiteLayout>
  )
}

export default TermsPage
