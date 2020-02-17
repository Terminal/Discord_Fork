---
description: A cool multipurpose bot with commands for fun, animals, searching, utility,
  text, emoji, and more.
name: AdvaithBot
---

AdvaithBot is a multipurpose Discord bot.


# Commands
The prefix for all commands is `!!` by default. Set a custom server prefix with the `prefix` command!

## 🖥️ System Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`help` | `h` | Sends the command list or info for a specific command | Command or module name (Optional) | `!!help`, `!!help fun`, `!!help 8ball`
`info` | none | Some info about the bot | none | `!!info`
`invite` | none | Sends the link to add the bot | none | `!!invite`
`mutuals ` | none | Your mutual servers with AdvaithBot | none | `!!mutuals`
`ping` | none | 🏓 Checks how fast the bot is responding | none | `!!ping`
`prefix` | none | Change the server prefix | New prefix (optional) | `!!prefix -`
`support` | none | Sends the link to the AdvaithBot server | none | `!!support`

## 🤣 Fun Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`8ball` |  `eightball`  | 🎱 Ask the 8ball a question! | Your question (Required) | `!!8ball is AdvaithBot awesome?`
`acronym` | none | Generates an acronym meaning for a word | Word or words to make a meaning for (Required) | `acronym dab`
`cleverbot` | `cb` | Talk to Cleverbot! | What you want to say (Required) | `!!cleverbot how are you?`
`reverse` | none | Reverses provided text | Text to reverse (Required) | `!!reverse hello`
`flip` | none | Flip a coin! | none | `!!flip`
`trbmb` | none |  That really \_\_\_\_\_ my \_\_\_\_\_ | none | `!!trbmb`

## 🐱 Animal Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`bird` |  none  | Sends a random bird pic | none | `!!bird`
`cat` |  none  | Sends a random cat pic | none | `!!cat`
`dog` |  none  | Sends a random dog pic | none | `!!dog`
`duck` |  none  | Sends a random duck pic or gif | none | `!!duck`
`duck gif` |  none  | Sends a random duck pic | none | `!!duck gif`
`duck pic` | none |  Sends a random non-animated duck pic | none | `!!duck pic`
`rabbit` | none | Sends a random rabbit pic | none | `!rabbit`

## 🔍 Search Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`ddg` | `duckduckgo` | Searches DuckDuckGo | Search query (Required) | `!!ddg advaithbot`
`google` | `g` | Searches Google | Search query (Required) | `!!google advaithbot`
`urban` | `u` | Searches Urban Dictionary | Search query (Required) | `!!urban no u`
`yt` | `youtube` | Searches YouTube | Search query (Required) | `!yt @someone`

## ⚙️ Utility Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`discrim` | none | Find users with a certain discriminator (#XXXX) | Discriminator to search for (Optional, defaults to yours) | `!!discrim`, `!!discrim 0001`
`embed` | none | Says what you want in an embed | What you want it to say (Required) | `!!embed hi everyone!`
`haste` | `hastebin` | Uploads code to hastebin | Code to upload (Required) | `!!haste hello`
`hook` | none | Sends your message as a webhook | What you want it to say (Required) | `!!hook hey everyone check out [AdvaithBot](https://advaithbot.com)`
`portmanteaus` | none | Make portmanteaus with a provided word | Word to make portmanteaus with (Required) | `!!portmanteaus hello`
`react` | none | Add a reaction to a message | Message ID (Required), Emoji to react with (Required) | `!!react 412350313450831874 :smiley:`
`rhymes` | none | Get rhymes for a provided word | Word to get rhymes for (Required) | `!!rhymes hello`
`say` | none | Makes the bot say something | What you want it to say (Required) | `!!say hi everyone!`
`splash` | none | Shows the server's invite splash screen. | none | `!!splash`
`imgur` | none | Upload an image to Imgur | URL to image, or attach image (Required) | `!!imgur <attach image>`
`translate` | none | Translate text to any language using Google Translate | Language name or 2-letter code to translate to (Required), text to translate (Required) | `!!translate spanish I am using Google Translate`
`upload` | none | Uploads a file using BiSoga | URL to image, or attach image (Required) | `!!upload <attach image>`

## 📝 Text Commands
For all text commands, the argument is the text to manipulate.

Command | Aliases | Description
---|---|---|---|---
`bend` | none | ʍąҟҽʂ աҽìɾժ էҽ×է Ӏìҟҽ էհìʂ
`bubbles` | none | ⓟⓤⓣⓢ ⓣⓔⓧⓣ ⓘⓝ ⓑⓤⓑⓑⓛⓔⓢ
`fliptext` | none | uʍop ǝpısdn ʇxǝʇ sdılɟ
`mirror` | none | ƚxɘƚ ꙅɿoɿɿim
`tiny` | `tinycaps` | ᴍᴀᴋᴇꜱ ᴛᴇxᴛ ɪɴᴛᴏ ᴛɪɴʏ ᴄᴀᴘꜱ
`zalgo` | `creepify` | m̷̳͌a̴̱͛k̷͇̐ë̵̥́s̶̰̀ ̴̨̇z̶̙̆a̵̝̓l̴͇̀ǧ̸̯o̸̞̅ ̶́͜ť̵̤ë̸̼́x̸̯̊t̷̬͒

## ℹ️ Info Commands

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`botinfo` | none | Shows some information about a provided bot. | Bot mention or ID (required) | `!!botinfo @AdvaithBot#2249`
`serverinfo` | `server` | Shows some information about the server. | none | `!!serverinfo`
`userinfo` | `user`, `uinfo` | Information about a user or yourself | User mention or ID (optional) | `!!user @advaith#9121`


## 🔨 Moderation Commands

Command | Aliases | Description | Arguments | Example | Required Permission
---|---|---|---|---|---
`ban` | `b`, `bean`, `banne`, `banhammer`| Swings the almighty ban hammer on a user 🔨 | User (Required), Reason (optional) | `!!ban @advaith#9121 spamming` | Ban Members
`freeze` | none | Blocks everyone from sending messages | None | `!!freeze` | Manage Roles
`kick` | `k` | Kicks a user | User (Required), Reason (optional) | `!!kick @advaith#9121 bye` | Kick Members
`purge` | `p`, `clear`, `prune` | Deletes a specified amount of chat messages. | Amount of messages (Required) | `!!purge 2` | Manage Messages
`role` | none | Adds a role to or removes a role from a user | [add \| remove] (Required), User (Required), Role (Required) | `!!role add @advaith#9121 Awesome People` | Manage Roles
`unban` | `unbanne`, `unbean`, `unbanhammer`| Unbans a user | User (Required), Reason (optional) | `!!unban @advaith#9121 is gud` | Ban Members
`unfreeze` | none | Unfreezes your server | none | `!!unfreeze` | Manage Roles

## 🔗 URL Shortener Commands
For all URL Shortener commands, the argument is the URL to shorten.

Command | Aliases | Description
---|---|---
`bisoga` | `shorten` | Shortens a URL using BiSoga
`isgd` | none | Shortens a URL using is.gd
`sketchify` | none | Makes a URL look sketchy with verylegit.link
`tinyurl` | none | Shortens a URL using TinyURL
`vgd` | none | Shortens a URL using v.gd

## 😀 Emoji Management Commands
All Emoji Management commands require the Manage Emojis permission.

Command | Aliases | Description | Arguments | Example
---|---|---|---|---
`deleteemoji` | none | Deletes a custom emoji | Emoji (Required) | `!!deleteemoji :thonking:`
`emoji` | `uploademoji` | Creates a custom emoji | Emoji name (Required), Image URL or attach image (Required) | `!!emoji Thonk <attach file>`
`renameemoji` | none | Renames a custom emoji | Emoji (Required), New name (Required) | `!!renameemoji :Thonk: thonking`

## Android Clyde Commands
These commands replicate Clyde's functionality on Discord for Android, which does not support Clyde commands.  
All these commands use the prefix `/`. 

Command | Description | Example
---|---|---
`/nick` | Changes your nickname | `/nick new nickname`
`/me` | Sends your text as italicized | `/me eats cookies`
`/shrug` | Appends ¯\\\_(ツ)\_/¯ to your message | `/shrug`
`/tableflip` | Appends (╯°□°）╯︵ ┻━┻ to your message | `/tableflip`
`/unflip` | Appends ┬─┬ ノ( ゜-゜ノ) to your message | `/unflip`
