import React, { Component } from 'react'
import styles from './styles.module.scss'
import SitePadSides from '../SitePadSides'

const places = [
  {label: 'Shopmobility', style: styles.white},
  {label: 'Top Secret Bunker', style: styles.brown},
  {label: 'Chessington World of Adventures', style: styles.brown},
  {label: 'Tower of London', style: styles.brown},
  {label: 'Stockport Transporter Bridge', style: styles.brown},
  {label: 'LOTTE World', style: styles.brown},
]

class SiteFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: null,
      style: null
    }
  }

  componentDidMount() {
    const place = places[Math.floor(Math.random() * places.length)]

    this.setState(place)
  }

  render() {
    return (
      <footer className={styles.footer}>
        <SitePadSides className={styles.container}>
          <p className={styles.copyright}>
            Copyright (c) 2015 - 2020 Leondro Lio<br />
            Made in Britain
          </p>
          <div className={styles.links}>
            <span className={styles.header}>Links</span>
            <a href="https://github.com/terminal/discord_fork">Source Code <span className={styles.green}>github.com</span> →</a>
            <a href="https://discord.gg/H9FhrwU">Discord Server <span className={styles.green}>discordapp.com</span> →</a>
            {this.state.label &&
              <span className={this.state.style}>← {this.state.label}</span>
            }
          </div>
        </SitePadSides>
      </footer>
    )
  }
}


export default SiteFooter
