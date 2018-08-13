---
pagename: Discord_Fork README.md file
description: Information about the Discord_Fork application and software
layout: docs
type: docs
permalink: /docs/readme/
---

<a href='https://jenkins.moustacheminer.com/job/Discord_Fork Builder'><img src='https://jenkins.moustacheminer.com/buildStatus/icon?job=Discord_Fork Builder'></a>

# Discord_Fork
The serverless (except for OAuth flow) Discord Bot list.

Add your bot [via the E-Zed editor](https://discordbots.co.uk/edit) or [via GitHub](https://discordbots.co.uk/docs/adding-a-bot/)

NOTE: Please do not complain over how *bad* the site is made, this is mostly made as a
way to be more unique and prove that a list site can possibly be made with Jekyll.

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
[We love you all](https://discordbots.co.uk/docs/attribution)

## Technical Support
[discordapp](https://discord.gg/8uC6aKZ)
