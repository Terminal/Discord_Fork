# Discord_Bots
The list you fork to add your bot to.<br>
Website URL: https://botlist.alexflipnote.xyz/

NOTE: Please do not complain over how *bad* the site is made, this is mostly made as a
way to be more unique and prove that a botlist can possibly be made with Jekyll.

## Adding your bot to the site
- Fork the project
- Add a new file in **\_bots** with `your_bot_name.md` and add the following:
```md
---
botname: BOT NAME
description: DESCRIPTION (limited to 60 characters)
long_description: LONG_DESCRIPTION (only viewable at bot page)
avatar: URL, must be the Discord avatar in PNG format and no ?size query
link: URL to invite bot, must be HTTPS
nsfw: true | false
---
```
- make a PR and wait for answers

## Requirements
- Ruby 2.4 or above - https://rubyinstaller.org/downloads/
- jekyll & bundle - https://jekyllrb.com/
- sass & scss_lint - Ruby Packages (gem install)

## Commands
```
bundle exec jekyll serve
    Testing website locally with localhost (Port 4000 is default)

scss-lint
    Check if your source code is linter friendly (SCSS only)
```
