---
pagename: Adding your bot to Discord Fork
description: Instructions on how to add your own bot to the Discord Fork botlist.
---

# Adding your bot to the website
Thanks for choosing Discord_Fork for your preffered Discord Bots Service Provider (DBSP)

You will require some knowledge on `git` in order to add your bot.

- Fork the project

![How to fork](https://its-not-advertising-if-the-website-doesnt-exist-anymore.moustacheminer.com/1531011733.77.png)

- Inside the `_bots` folder, create a file called `[CLIENT_ID].md`, where `[CLIENT_ID]` is the ID of your bot.
- Copy the code below, and replace with your own details

```ini
---
client_id: [The client ID of your bot]
application_id: [OPTIONAL / The application ID of your bot. Delete this line, unless you have a pre-2016 bot]
pagename: [The name of your bot]
prefix: [The prefix of your bot]
description: [The description of your bot, limited to 60 characters]
long_description: [OPTIONAL / A longer description which displays on your bot page]
avatar: [An avatar URL to a Discord website]
link: [A link to invite your bot - HTTPS only]
github: [OPTIONAL / The location of the source for this bot]
  owner: username
  repo: projectName
nsfw: true | false [If your bot is "Not Safe For Work"]
---

# Markdown
This is an example of Markdown. [Here is a tutorial](https://guides.github.com/features/mastering-markdown/)

_thanks_ **alex**
```

- Create a commit
  - ![Creating and editing a file](https://its-not-advertising-if-the-website-doesnt-exist-anymore.moustacheminer.com/1531012665.07.png)
- Go the pull requests page
  - ![Going to the correct PR place](https://its-not-advertising-if-the-website-doesnt-exist-anymore.moustacheminer.com/1531012768.53.png)
- Create a pull request
  - ![Creating a PR](https://its-not-advertising-if-the-website-doesnt-exist-anymore.moustacheminer.com/1531012827.26.png)
  - ![Pressing the button to create a PR](https://its-not-advertising-if-the-website-doesnt-exist-anymore.moustacheminer.com/1531012912.81.png)
- Now wait from 3 to 10 business days.
