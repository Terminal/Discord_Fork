---
description: A discord bot that automatically creates and deletes voice channels when needed
name: Voice Manager
---

[Setup guide](https://github.com/BestMordaEver/Voice-Manager/wiki/How-to-set-up-Voice-Manager) | [Support and news Discord server](https://discord.gg/tqj6jvT)

Voice Manager is a simplistic bot, that allows your users to create new voice channels on demand!

Assign a lobby and everybody entering this lobby will be placed in a newly created channel. Once everybody leaves this new channel - it gets deleted.

The bot will keep new channels in the same category as the lobby and will enable same user limits as the lobby.

[Here's how it looks](https://i.imgur.com/xNKVC2B.mp4)

List of available commands:
- help (or empty mention) - shows help message
- register [voice_chat_id OR voice_chat_name] - registers a voice chat that will be used as a lobby
- unregister [voice_chat_id OR voice_chat_name] - unregisters an existing lobby
- id [voice_chat_name OR category_name] - use this to learn ids of voice channels by name or category
- list - lists all registered lobbies and how many new channels exist
- stats - take a sneak peek on bot's performance!
- support - sends an invite to support Discord server
