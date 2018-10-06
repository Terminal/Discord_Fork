---
pagename: API Reference
description: Endpoints for discordbots.co.uk
---

### GET `/api/all.json`
Get a list of all markdown files.

```json
{
  "fields": {
    "permalink": "/bots/267941509272174592",
    "filelink": "/bots/267941509272174592",
    "locale": "en",
    "template": "bots",
    "filename": "267941509272174592"
  },
  "frontmatter": {
    "application_id": null,
    "avatar": "https://xela.alexflipnote.xyz/assets/images/profile-128.png",
    "pagename": "xelA",
    "description": "A powerful bot for your discord server",
    "link": "https://xela.alexflipnote.xyz/",
    "support": "https://discord.gg/DpxkY3x",
    "nsfw": false,
    "github": {
      "owner": "xelA",
      "repo": "discord_bot.py"
    }
  },
  "html": "...",
  "wrapped": [
    "A powerful bot for your discord",
    "server"
  ]
}
```

### GET `/api/:filelink.svg`
Get a fancy SVG embed of the item.

#### Note
"filelink" can be found in `/api/all.json`, under "fields.filelink"

`/api/bots/267941509272174592.svg`  
![Example](/api/bots/267941509272174592.svg)

`/fr/bots/305277118105911296.svg`  
![Example](/api/fr/bots/305277118105911296.svg)

### GET `/api/:filelink.png`
Get a fancy PNG embed of the item.

#### Note
"filelink" can be found in `/api/all.json`, under "fields.filelink"

`/api/bots/267941509272174592.png`  
![Example](/api/bots/267941509272174592.png)

`/api/docs/index.png`  
![Example](/api/docs/index.png)
