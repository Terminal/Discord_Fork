---
pagename: Discord_Fork README.md file
description: Information about the Discord_Fork application and software
layout: docs
type: docs
permalink: /docs/readme/
---

![Discord Fork Botlist, The botlist with built in GitHub integration](/assets/images/readme-header.png)

Add your bot [via the E-Zed editor](https://discordbots.co.uk/edit) or [via GitHub](https://discordbots.co.uk/docs/adding-a-bot/)

[Visit us on Discord!](https://discord.gg/8uC6aKZ)

NOTE: Please do not complain over how *bad* the site is made, this is mostly made as a
way to be more unique and prove that a list site can possibly be made with Jekyll.

## Requirements
- Ruby 2.4 or above - https://rubyinstaller.org/downloads/
- jekyll & bundle - https://jekyllrb.com/
- sass & scss_lint - Ruby Packages (gem install)
- Node.js 10.x

OR

- Netlify
  - [Click here to deploy](https://app.netlify.com/start/deploy?repository=https://github.com/Terminal/Discord_Fork)

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

# Licence
- [Licence](https://github.com/Terminal/Discord_Fork/blob/master/LICENCE)
- [Attribution to dependencies](https://discordbots.co.uk/docs/attribution)

## Is this site a clone of `ls.terminal.ink`?
No it is not, and it does not use any similar software such as Express and other middleware. The site was originally a fork of `AlexFlipnote`/**`Discord_Fork`**, but the original has since been deleted, and Alex has given permission for this site to continue.

## Can I host my own?
Yes you can. We would like to encourage people to help contribute (_cough_ Mayo's Boy List _cough_). With the source being open, it'll make this site better than others, and bring more variety of bots.

[Click here to deploy this website with Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/Terminal/Discord_Fork)

## Can I become a developer?
[Contribute here!](https://github.com/Terminal/Discord_Fork)
