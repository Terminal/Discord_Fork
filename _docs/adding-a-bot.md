---
pagename: Adding your bot to Discord Fork
description: Instructions on how to add your own bot to the Discord Fork botlist.
---

# Adding your bot to the website
Thanks for choosing Discord_Fork for your preffered Discord Bots Service Provider (DBSP)

## From GitHub
You will require some knowledge on `git` in order to add your bot.

### 1. Fork the project

![How to fork](/assets/images/adding-a-bot/1531011733.77.png)

### 2. Create a file
- Inside the `_bots` folder, create a file called `[CLIENT_ID].md`, where `[CLIENT_ID]` is the ID of your bot.
- Copy the code below, and replace with your own details
- If you do not have a GitHub repository, **DO NOT** insert the following
  - ```
    github:
      owner: N/A
      repo: N/A
    ```
  - This is not allowed, and is grounds for deletion
  - Creating a GitHub repository is recommended, as it increases your ranking on the homepage.
    - Read more about rankings [here](/docs/ranking);
- Optional fields are OPTIONAL. **DO NOT** insert `N/A` when you have nothing to insert.
  - This is also not allowed, and is grounds for deletion.

```
---
client_id: [The client ID of your bot]
application_id: [OPTIONAL / The application ID of your bot. Delete this line, unless you have a pre-2016 bot]
pagename: [The name of your bot]
prefix: [The prefix of your bot]
description: [The description of your bot, limited to 60 characters]
avatar: [An avatar URL to a Discord website]
link: [A link to invite your bot - HTTPS only]
support: [OPTIONAL / A link to the Discord server for the bot]
github: [OPTIONAL / The location of the source for this bot]
  owner: username
  repo: projectName
nsfw: true | false [If your bot is "Not Safe For Work"]
---

# My Bot
You can place MARKDOWN inside this box.
[Here is a tutorial](https://guides.github.com/features/mastering-markdown/)

## Secondary Heading
Place information about your bot below the three dashes above (---).
It can be HTML, or Kramdown compatible Markdown.

_thanks_ **alex**
```

- Create a commit
  - ![Creating and editing a file](/assets/images/adding-a-bot/1531012665.07.png)

### 3. Create a pull request
- Go the pull requests page
  - ![Going to the correct PR place](/assets/images/adding-a-bot/1531012768.53.png)
- Create a pull request
  - ![Creating a PR](/assets/images/adding-a-bot/1531012827.26.png)
  - ![Pressing the button to create a PR](/assets/images/adding-a-bot/1531012912.81.png)
- Now wait from 3 to 10 business days.
