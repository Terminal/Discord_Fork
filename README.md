# Discord_Bots
Basically a stupid botlist made because of memes.

## Adding your bot to the site
- Fork the project
- Add a new file in **\_data** with `your_bot_name.yml` and add the following:
```yml
name: BOT NAME
description: DESCRIPTION (limited to 60 characters)
avatar: URL, must be HTTPS
link: URL to invite bot, must be HTTPS
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
