
# Discord_Fork
A fork of a fork of a fork
- `AlexFlipnote`/`Discord_Fork`
  - `perryprog`/`Discord_Fork`
    - `Terminal`/`Discord_Fork`

[Add your bot like this](https://discordbots.co.uk/docs/adding-a-bot/)

NOTE: Please do not complain over how *bad* the site is made, this is mostly made as a
way to be more unique and prove that a list site can possibly be made with Jekyll.

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

## First Setup
You will require some kind of Linux. I prefer Ubuntu 18.04.
Windows users may wish to use the Windows Subsystem for Linux.

### Ubuntu 18.04, 16.04, WSL Ubuntu
```
sudo apt install build-essential ruby-full ruby-bundler
bundler exec jekyll serve
```
