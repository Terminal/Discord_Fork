---
pagename: API Reference
description: Information on available API interfaces to connect to the Fork list.
---

# API Reference
Discord Fork is built on top of GitHub using GitHub pages and Jekyll, which means it is limited by GET requests only.
Please interface with the GitHub API in order to automate actions with the bot list.

GET `/api/bots/all.json`  
Obtain information on all bots.
Some keys may be missing, such as the `github` key.

```json
{
  "id" : "195244363339530240",
  "client_id" : "195244363339530240",
  "application_id" : "195244341038546948",
  "name" : "KawaiiBot",
  "prefix": "+",
  "description" : "A kawaii Discord bot that makes your server more fun!",
  "long_description" : "",
  "url_safe": "kawaiibot",
  "avatar" : "https://cdn.discordapp.com/avatars/195244363339530240/ec4594ead877809a2a53bade17f3cc94.png",
  "link" : "https://discordapp.com/oauth2/authorize?client_id=195244341038546948&scope=bot",
  "support" : "",
  "github" : { 
      "owner" : "KawaiiBot",
      "repo" : "KawaiiBot"
  },
  "verified" : false,
  "nsfw" : false
}
```

GET `/api/servers/all.json`  
Obtain information on all servers.
Some keys may be missing, such as the `github` key.

```json
{
  "id" : "330777295952543744",
  "server_id" : "330777295952543744",
  "name" : "Terminal",
  "description" : "The server of Terminal.ink",
  "long_description" : "The server of Terminal.ink",
  "url_safe": "terminal",
  "avatar" : "https://terminal.ink/assets/images/avatar.png",
  "link" : "https://discord.gg/8uC6aKZ",
  "github" : { 
    "owner" : "terminal"
  },
  "verified" : true,
  "nsfw" : false
}
```
