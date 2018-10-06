---
pagename: Discord_Fork README.md file
description: Information about the Discord_Fork application and software
layout: docs
type: docs
permalink: /docs/readme/
---

[![Discord Fork Botlist, The botlist with built in GitHub integration](/assets/images/readme-header.png)](https://v1--discordbots.netlify.com/)

# Deprecated
Please use the `v2` branch. This branch is only accepting bug pull requests.

## Deploy
- [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/terminal/discord_fork)
- [View builds](https://app.netlify.com/sites/discordbots/deploys)

## Requirements
- Ruby 2.4 or above - https://rubyinstaller.org/downloads/
- jekyll & bundle - https://jekyllrb.com/
- sass & scss_lint - Ruby Packages (gem install)
- Node.js 10.x

## Commands
```
bundle exec jekyll serve
    Testing website locally with localhost (Port 4000 is default)

scss-lint
    Check if your source code is linter friendly (SCSS only)

webpack --watch
    Build all JavaScript files into a single file
```

## First Setup
You will require some kind of Linux. I prefer Ubuntu 18.04.
Windows users may wish to use the Windows Subsystem for Linux.

### Translating
[click me](https://discordbots.co.uk/docs/locale)

### Ubuntu 18.04, 16.04, WSL Ubuntu
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y build-essential ruby-full ruby-bundler nodejs
npm i

# run both simultaneously
bundler exec jekyll serve
webpack --watch
```

### Authentication Server
[Follow me](https://github.com/prose/gatekeeper#setup-your-gatekeeper)  
Edit `_data/links.yml` to point to the auth server.

## Thanks
[Attribution to dependencies](https://discordbots.co.uk/docs/attribution)

## Technical Support
[discordapp](https://discord.gg/8uC6aKZ)

# Developer Notes
```
Pages within the _pages folder should not have a "French" copy.
  These need to use the `desc_code` front matter to use a new description within the `_data/:lang/descriptions.yml` file
Pages within the _bots, _docs and _servers folder can have a subfolder with the language
  The language of the page needs to be placed in the front matter, like

  ---
  pagename: wow
  github:
    owner: Terminal
    repo: Discord_Fork
  lang: fr
  ---

  Copies of the same language do not pass information between each other.
  For example, if you have an English file, the front matter needs to be copied into the French file, with changes to the description and page name for language differences

All translations for the website itself, and not user generated content (and documentation) should be in the _data/:lang folder.
  Translators need to go through all .yml files.

Am I a terrible person?
  Yes
```
