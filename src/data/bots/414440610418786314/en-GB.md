---
description: A Discord bot that helps you create embeds. Also plays you music.
name: MusEmbed
---

Note:

Full list of commands and their usage can be found on our website, or provided by the bot using the command `{prefix}help [command name]`. Here is a key for commands featured here.

- `<(required arguments)>`
- `[(optional arguments)]`

MusEmbed™ | Clean Embeds, Crisp Music
=================================

This is a bot that can help you easily create embeds in your server. We also have music playing functionality.

Customizable Prefix
----------------------

You can easily customise different settings, including the bot's prefix, of your server via the command `{prefix}setconf <configuration> <new value>`.

Here are the two available configurations:

- `censor on/off` (off by default): Turns on/off swear word censoring.

- `prefix <new prefix>` (default `em/`): Sets a new prefix for the server. If you forget, just mention the bot as a prefix and use the command `{prefix}help`.

Easily create embeds for your guild
-------------------------

Easily create embeds. One simple command - bam, that's it.

You can choose from two kinds of embeds: 

- `{prefix}embed [hex code] <message>` gives you a customised embed with your name

- `{prefix}rawembed [hex code] <message>` does the same without your name

Note that if no hex code is provided, the embed created will be grey in colour.

High-quality music - crisp clear
-------------------------

Our music is decoded at a bitrate of 512kbps,  and comes with a well-developed queue.

- `{prefix}play <song name/link>` plays the provided song in your voice channel.

- `{prefix}pause` and `{prefix}resume` are self-explanatory.

- `{prefix}loop` toggles the queue's loop mode. Available modes are `single`, `all` and `off`.

- `{prefix}queue` and `{prefix}np` shows the current queue and song respectively. `{prefix}queue` also shows the current loop mode.

- `{prefix}volume [number 1-10]` changes the volume to the provided number. Defaulted at 10. Shows current volume if a number isn't provided.

- `{prefix}skip` and `{prefix}stop` skips the current song and deletes the whole queue respectively. The latter is admin-only.

Utility and Moderation
----------------------

We provide basic utility and moderation commands (e.g. botinfo, serverinfo, purge, etc.). More information about these can be found [here](https://www.musembed.tk/commands).
