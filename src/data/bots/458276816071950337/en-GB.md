---
description: This bot adds member counters, server stats and welcomer messages to your
  server.
name: ServerStats
---

# ServerStats
This bot can show you **all members**, **members**, **bots**, **channels**, **categories**, **voice**, **text**, **roles**, **emojis**, **static**, **animated**, **online**, **offline**, **role**, **bans**, **connected**, **status**, **playing** and **minecraft**. It can also show a **welcome channel** with joined and left messages. This all will (by default) be shown under a category with channels and the channel names will be changed. You can also customize the text that is displayed in front end behind the number. The setup is really easy just type `s/setup`

**IMPORTANT** You need to run the setup command first, without it the bot won't do much. Use `s/setup` or `@ServerStats setup` to run the setup. Also if you want to get the other counters to show up you need to turn them on (this can be done with a command).

_____

## Setup information
Go to this link for a step by step setup instructions or video: https://github.com/ZixeSea/ServerStats/blob/master/HOW_TO_INSTALL.md

This bot needs to have **Manage Roles**, **Manage Channels**, **Read Text Channels & See Voice Channels**, **Connect** to change the channel names so if the bot doesn't have it **THE BOT WON'T WORK**. If the bot has the right permissions but still doesn't work you can join the support server and get help there.
_____

## Bot commands
### Normal

`s/help <command>` [Send all the commands if you don't put a command after it else it will if info about the command.]

`s/customize` [Sends info about how to customize the counters.]

`s/ping` [Sends a pong message with latency.]

`s/invite` [Sends an invite link for the bot.]

`s/vote` [Sends instructions on how to vote for the bot.]

`s/donate` [Sends instructions on how to donate.]

`s/support` [Sends info about how to get help.]

`s/partners` [Sends info about our partners.]
_____

### Admin

`s/setup` [This command will set up the bot and create the 3 default counters.]

`s/counter <counter> <on/off>` [With this command you can turn on/off counter.]

`s/data <type>` [This will send all the data saved about your server.]

`s/category` [This will create a new category and puts the counter under it. (you don't need a category)]

`s/prefix <prefix>` [This will change the prefix.]

`s/permission <permission>` [This will change the permission needed for using admin commands.]

`s/welcome <on/off>` [This will create a join and leave log channel.]

`s/minecraft <on/off> <IP>` [This will create a minecraft server info counter (port is not required).]
_____

### Info

`s/info` [Sends info about the bot.]

`s/serverinfo` [Sends info about the server.]

`s/userinfo <ID/mention>` [Sends info about an user.]

`s/roleinfo <ID/mention>` [Sends info about a role.]

`s/channelinfo <ID/mention>` [Sends info about a channels.]

`s/inviteinfo <URL/code>` [Sends info about an invite.]

`s/avatar <ID/mention>` [Sends the avatar form an user.]

`s/check` [This will check if the bot has the right permissions to do stuff.]

`s/leaderboard` [Send you a list of the top 10 DBL voters.]

`s/donators` [Send you a list of donators and their tiers.]
_____
