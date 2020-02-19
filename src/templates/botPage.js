import React from 'react';
import SiteLayout from "../components/SiteLayout";
import SiteSEO from "../components/SiteSEO";
import { graphql } from 'gatsby';
import SitePadSides from '../components/SitePadSides';

const BotPage = ({ data }) => {
  const bot = data.botsJson
  return (
    <SiteLayout>
      <SiteSEO title="Home" />
      <SitePadSides>
        <h1>{bot.id}</h1>
      </SitePadSides>
    </SiteLayout>
  )
}

export default BotPage

export const pageQuery = graphql`
  query($id: String!) {
    botsJson(id: {eq: $id}) {
      id
      authors
      categories
      contents {
        description
        locale
        name
        page
      }
      created
      edited
      flags {
        inAppPurchases
        adverts
      }
      hide
      nsfw
      state
      support
      website
      videos {
        youtube
      }
      trigger {
        customisable
        mentionable
        prefix
      }
    }
  }
`
