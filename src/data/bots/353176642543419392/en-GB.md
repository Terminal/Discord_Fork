---
description: A multi purpose bot, that can play music, games, Leveler, and a lot more !
name: AyRobot
---

Prefix: “." (Can be changed)
Type .help for have all commands of the bot ! ??

Music commands (.help music):
• .play <url_or_search>  : Play a URL or Search for a track on YouTube.

(URL : YouTube. Soundcloud. mp3 streams. even twitch streams and Spotify) (Spotify is slower when adding playlist. but it works. no worries it will be improved in the future)

• .skip  : Skip to next track.

• .previous : Play the previous track.

• .pause : Pause the track.

• .resume : Resume a track paused.

• .stop : Stop the player, and disconnect.

• .shuffle : Toggle shuffling.

• .repeat : Toggle repeat.

• .now or .np : Show the track playing now.

And more in the .help Audio command !

Moderation commands : .help AvertSystem

• .avert <1, 2, 3, 4> <user> <reason> : give a warn, kick, tempban (tempban adds a time units to the command, check out .help avert 3 for more infos), and perm ban to the user, for the given reason, creating some modlog in the configured channel (check out .help avert config for more infos on how to configure the cog)

General commands:

• .twitch or .youtube : Check if a Twitch or YouTube channel is live.

• .bank : Manage your bank account.

• .leaderboard : Show the global leaderboard.

• .payday : Get some free currency between 50-120 credits.

• .slot : Use the slot machine.

• .blackjack : A simple blackjack game, linked to the central economy system of the bot.

• .partygames  : Play some party games through discord !

• .octogone <user1> [user2] : Some french joke, will put the avatar of user1 and user2 (or author of the command if user2 not provided) into an "octogone" image. Reference to Booba and Kaaris fighting in french airport.

Images commands (.help images):

• .gif <search> : Send the first gif matching the search from giphy.

• .gifr <search> : Send a random gif matching the search from giphy.

Utility commands :

• .avatar : Show your avatar in a large size.

• .invite : Send the invitation link of the bot.

Information commands:

• .userinfo : Show your user informations.

• .serverinfo : Show the informations of current server.

• .info : Show info about the bot.

• .ping : Make the bot reply "Pong." to your message. Mostly used to see if the bot is lagging.

• .pingtime : Show a more detailed ping of the bot.

• .uptime : Show how many time the bot is live.

• .antiraid : An antiraid cog, there is still some work to do to automate that, so the feature is "premium" and the message saying that is in french, don't mind it.

Guild management tools (still WIP) :

• .addbypassrole <role> : add a role to bypass the anticaps.

• .capspercent <percent> : set the percent of caps needed for a message to be deleted.

• .togglecaps : toggle on or off the anticaps feature.

• .slowmode [channel] <time> : Allow to put a slowmode into the given or current channel, up to 6 hours (as allowed by discord API)

• .slowoff [channel] : Turn off slowmode of given or current channel.

Leveler commands:

This cog has an entire doc here: https://discord-cogs.readthedocs.io/en/latest/leveler.html#configuration-commands
Just note that cog is public, but i wrote it, don't be surprised if you see the same cog on any other bot.

Future commands (waiting for Red v3.1 to be released):

League of legend cog:
Using home made API, called Neeko !

• .setapikey <api_key> : to set your Riot API key, must be set before using any other command, otherwise they won't respond. The api key can also be set using .set api league <api_key>
Note that it is better to use that command in DM, to avoid leaking your api key.

• .elo <username> : Get the current rank of that username, if it exists.

• .masteries <username> : Show the top masteries champions of that username, if it exists.

• .game <username> : Show the bans, picks, and elo of allies and ennemies of the current game, if that username is currently ingame.

• .history <username> <limit> : Shows last games of that username, if no limit provided, it'll show last 5 games.

Apex cog:
Using home made api of Tracker Network.
Can only show stats you are tracking ingame, per character.

• .apex <username> : Show your 3 most played legends'stats.

Contact Malarne#1418 for support
Fork of Red-DiscordBot v3.

Currently improving and adding features.

More commands are coming soon !

Thanks to Red-DiscordBot for base of this nice bot. and all the help to create it.
