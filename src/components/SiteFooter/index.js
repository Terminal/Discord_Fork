import React, { Component } from 'react'
import styles from './styles.module.scss'
import SitePadSides from '../SitePadSides'

const places = [
  {
    label: 'Shopmobility',
    style: styles.white,
    link: null
  },{
    label: 'Top Secret Bunker',
    style: styles.brown,
    link: null
  },{
    label: 'Chessington World of Adventures',
    style: styles.brown,
    link: 'https://www.chessington.com/'
  },{
    label: 'Tower of London',
    style: styles.brown,
    link: 'https://www.hrp.org.uk/tower-of-london/'
  },{
    label: 'Newport Transporter Bridge',
    style: styles.brown,
    link: 'http://www.newport.gov.uk/heritage/Transporter-Bridge/Transporter-Bridge.aspx'
  },{
    label: 'LOTTE World',
    style: styles.brown,
    link: 'http://www.lotteworld.com'
  }
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
              this.state.link ?
                <a href={this.state.link}><span className={this.state.style}>← {this.state.label}</span></a> :
                <span className={this.state.style}>← {this.state.label}</span>
            }
          </div>
        </SitePadSides>
      </footer>
    )
  }
}


export default SiteFooter
