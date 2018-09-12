---
pagename: How to translate discordbots.co.uk for International Audiences
---

# Translators
1. Copy an existing folder in the `_data` directory and rename it to the name of the language
2. Start editing files

![How to rename a folder.](/assets/images/locale/rename.gif)

_Optional steps_
- Create a folder with the name of the language folder in the `_docs` directory
- Copy files that you want to translate from the `_docs` directory into your new folder
- In the front matter, add `lang:` followed by your language.
  - _"Here's one I prepared earlier"_
    ```yml
    ---
    pagename: Stan Talent
    lang: fr
    ---
    ```

_Additional Optional steps_
- Edit the `_config.yml` file and add your language to the list
- Add the flag to the `_pages/lang.html` file

_Additional Additional Optional Steps_
- [Watch this video for the rest of your life](https://www.youtube.com/watch?v=846cjX0ZTrk)

# Notes
- The `_data` folder contains data for the website.
- Language data goes inside the respective language folder
  - `categories.yml` is strings relevant to each part of the website
    - Bots
    - Servers
    - Documentation
  - `descriptions.yml` contains the "metadata" which search engines like Bing, Yandex and Yahoo (oh and Google) see
  - `strings.yml` is everything that I haven't bothered to categorise correctly.
- The `en` language will always refer to `English (United Kingdom)`

# Testing
- Follow the "optional steps" above
- Run `bundler exec jekyll serve`
  - Webpack is not required for translation work
- Go to `http://127.0.0.1:4000/`, followed by the language code.
  - For example, `http://127.0.0.1:4000/fr`
  - English UK lives on the root
- Check there aren't any bits of English lying around

<!--
  Stan LOONA
  Stan Talent
-->
