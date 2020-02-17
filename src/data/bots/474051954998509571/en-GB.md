---
description: The only suggestions bot you'll ever need. Simple usage and management of
  suggestions any use.
name: Suggestions
---

# Suggestions
The "Suggestions" bot is a simple and easy to use, but an extensive bot, that's built to be the only tool for suggestions you need in your Discord server.

Getting the bot up and running is very simple. All you have to do is create and set the suggestions channel, logs channel and some staff roles. Use the `config` command and the various options to set these values. 
```bash
,config channel [channel] # Configure the suggestions channel. You can either mention/tag the channel or supply the name/ID of the channel
,config logs [channel] # Configure the suggestions log channel. Same functionality as setting the suggestions channel
,config roles [role] # Add or remove a staff role. Its addition or removal is automatically determined. Same functionality as setting the suggestions channel
```

Make sure that the bot has the base permissions for proper functionality. The Suggestions bot will only have the permissions it needs and nothing more.
Once that's set up, users can begin submitting suggestions! For approving/rejecting suggestions, just visit the "Suggestion Management" section below.

Adding a new suggestion is simple. Use `,suggest <suggestion>` to type out your suggestion. Once submitted, the suggestion will be posted in a `#suggestions` channel (or the channel you set above) by default on your server where users will then be able to vote via reactions (read below to set custom channels).

If you need to check the current bot prefix, simply mention the bot or mention the bot with the `prefix` command. Examples:
```
@Suggestions#2602 
@Suggestions#2602 prefix
```
You should get a response similar to this:
```
My prefix in this guild is ,
```

#### Suggested Usage
With the setup above, it's recommended to disable the `SEND_MESSAGES` and `ADD_REACTIONS` permissions for `@everyone` and give those explicit permissions to the bot's role. In this case, the suggestions and logs channel may be kept clean and only the vote reactions can be used.

#### Suggestion Management
Allow staff members in your Discord to manage suggestions via approving and rejecting them via specific roles. Simply add some roles using `,config roles <role>` and from there, suggestions can be managed by any members in those set roles.

*By default, users with the `MANAGE_GUILD` permission can manage suggestions.*

#### Staff Suggestions
Allow zero interference with user suggestions allowing staff members to suggest and vote on matter internally with no interruptions. Read more on about this via our [Staff Suggestions](https://docs.suggestionsbot.com/docs/staff-suggestions.html)'s page in the documentation.

#### Custom Configuration
Server owners can change the default prefix and suggestions channel of the Suggestions bot along with a wider range of configuration via the `config` command. Here are a few examples:

- `,config prefix [prefix]` allows you to the change the bot's prefix
- `,config channel [channel]` allows you to change the suggestions channel
- `,config emojis [id]` allows view all available emoji sets and choose one of them to your liking
- `,config dmResponses [true|false]` allows you to configure if DM responses should be sent to your users when a suggestion is submitted, approved, rejected, or a note has been added

*User must have the `MANAGE_GUILD` permission to change these settings*

#### Suggestions Features, Reporting Bugs and Receiving Support
If there is ever an error or bug or you wish to suggest something new to the bot, then you may join our Support Discord (just click [here](https://discord.gg/ntXkRan)!). Follow the single super-easy step once you join and then head over to the `#support` channel if you need help, `#bug_reports` if found a bug or simply discuss (both channels located under then `🚨Suggestions Bot` category) and post a suggestion the same way you would submit a new suggestion as described above!

#### Future Features
- Support for creating custom emoji sets
- Dashboard for managing, viewing and sharing suggestions
- Leave suggestions in the Discord

*You can also mention the bot in place of the prefix to use commands!*
  Read the website for more information and unlock the full usage of the bot! [https://suggestionsbot.com](https://suggestionsbot.com)
