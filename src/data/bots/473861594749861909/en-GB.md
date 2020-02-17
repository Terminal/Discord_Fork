---
description: The free and open source bot application marketplace
name: Discord Apps
---

# Discord Apps Marketplace
_curated by Terminal.ink_

Discord Apps Marketplace is the next generation in Bot Listing technology,
utilising the latest web technology for the bot list of tomorrow.

## Features
### Progressive Web Application
![pwa](.github/pwa.png)

Install Discord Apps Marketplace in supported Google Chrome browsers.
Service worker speeds up page loads for the fastest experience.

### Multi Language support
![i18n](.github/languages.gif)

Present your ideas in more than just English.
Make your bot page in multiple languages to target many more users.

### Images, YouTube and YOUKU video embed
![embeds](.github/embeds.gif)


### Multi Prefix
![prefixes](.github/prefixes.png)

Add multiple prefixes with available flags for if the bot can be mentioned or customised.

## Development Previews
Location                                                          | Description
----------------------------------------------------------------- | -----------------
[Discord Apps Marketplace](https://discordapps.dev/)              | Production instance
[netlify](https://twink.netlify.com/)                             | Development instance - Always latest commit
[Fog Creek Software's Glitch](https://discordapps-dev.glitch.me/) | Glitch is a great website
[Olivia Hye](https://www.youtube.com/watch?v=UkY8HvgvBJ8)         | Not related. Stan LOONA.

## Command Information
Command             | Description
------------------- | ---------------
yarn                | Download dependencies
yarn dev            | Run the development server
yarn create-bundles | Package the clientside and serverside portions for deployment
yarn start          | Run the production server

## Set up Development environment
**You will need:**
- Node.js
- Build tools
  - Ubuntu: `sudo apt install build-essential`
  - Windows: (as admin) `npm i -g windows-build-tools`
- Yarn
  - Ubuntu: `sudo npm i -g yarn`
  - Windows: (as admin) `npm i -g yarn`

```bash
// Clone the project
git clone --recursive-submodules -j8 https://github.com/terminal/discordapps.dev.git

// Install dependencies
yarn

// Start the project
yarn dev
```

<!--
## Sponsors
This project is funded by people who keep the open source community alive.
-->

<!-- --!

[javascript](javascript:alert(1))

