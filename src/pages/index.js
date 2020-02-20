import React from 'react';
import SiteLayout from "../components/SiteLayout";
import SitePadSides from "../components/SitePadSides";
import SiteSEO from "../components/SiteSEO";
import BotCardsAll from '../components/BotCardsAll';
import TransportSign from '../components/TransportSign';
import TransportSignTitle from '../components/TransportSignTitle';

const IndexPage = () => {
  return (
    <SiteLayout>
      <SiteSEO title="Home" />
      <SitePadSides>
        <TransportSign>
          <TransportSignTitle>
            <h2>New</h2>
          </TransportSignTitle>
        </TransportSign>
        <BotCardsAll limit={6} />
        <TransportSign>
          <TransportSignTitle>
            <h2>NSFW</h2>
          </TransportSignTitle>
        </TransportSign>
        <BotCardsAll limit={6} filter={bot => bot.nsfw} />
        <TransportSign>
          <TransportSignTitle>
            <h2>Games</h2>
          </TransportSignTitle>
        </TransportSign>
        <BotCardsAll limit={6} filter={bot => bot.categories.includes('games')} />
      </SitePadSides>
    </SiteLayout>
  )
}

export default IndexPage
