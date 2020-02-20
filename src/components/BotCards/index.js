import React from 'react';
import BotCard from "../BotCard";
import styles from './styles.module.scss';

const BotCards = ({ bots }) => (
  <div className={styles.cards}>
    {bots.map(bot => <BotCard bot={bot} key={bot.id} />)}
  </div>
)

export default BotCards
