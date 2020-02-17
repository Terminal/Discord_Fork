---
description: SpaceX Discord bot - launches, notifications and other commands related to
  SpaceX and Elon Musk.
name: InElonWeTrust
---

# In Elon We Trust

![InElonWeTrust](https://discordbots.org/api/widget/status/462742130016780337.svg) ![InElonWeTrust](https://discordbots.org/api/widget/servers/462742130016780337.svg?noavatar=true) ![InElonWeTrust](https://discordbots.org/api/widget/lib/462742130016780337.svg?noavatar=true)

Discord bot providing commands related to SpaceX and Elon Musk.

**Main features**:
* information about the next launch
* previous, upcoming and more specialized list of launches
* notifications (you will be notified about all new tweets, Flickr photos, hottest topics on /r/spacex and upcoming launches)
* other fun stuff: Elon's quotes, company data and history, random videos, launchpads, rockets and more

# [Invitation link](https://discordapp.com/oauth2/authorize?client_id=462742130016780337&permissions=27712&scope=bot)

Requires Manage Messages permission to do pagination properly. It will work without (but won't be that fun).

# Prefixes
There are a few methods to call bot command (space between prefix and command is allowed):
  * e!command
  * elon!command

# Commands
### Launches
| Command | Description | Required permissions |
|---|---|---|
| __e!NextLaunch__  | get information about the next launch | none |
| e!LatestLaunch  | get information about the latest launch | none |
| e!GetLaunch [FlightNumber]  | get information about the launch with the specified flight number (which can be obtained by e!AllLaunches or similar command) | none |
| e!RandomLaunch  | get information about the random launch | none |
| e!AllLaunches  | get a list of all launches (past and upcoming) | none |
| e!FailedLaunches  | get a list of unsuccessful launches | none |
| e!LaunchesWithOrbit [OrbitType] | get a list of launches with the specified target orbit (type e!help LaunchesWithOrbit to get a list of them) | none |
| e!PastLaunches  | get a list of past launches | none |
| e!UpcomingLaunches  | get a list of upcoming launches | none |

### Media
| Command | Description | Required permissions |
|---|---|---|
| e!RandomElonTweet  | get a random tweet from Elon Musk's Twitter profile | none |
| e!RandomSpaceXTweet  | get a random tweet from SpaceX's Twitter profile | none |
| e!RandomSpaceXFleetTweet  | get a random tweet from SpaceXFleet's Twitter profile | none |
| e!RandomFlickrPhoto  | get a random photo from SpaceX's Flickr profile | none |
| e!RandomRedditTopic  | get a random topic from /r/spacex subreddit | none |

### Notifications
| Command | Description | Required permissions |
|---|---|---|
| e!EnableAllNotifications  | enable all notifications at the current channel | Manage Messages |
| e!DisableAllNotifications  | disable all notifications at the current channel | Manage Messages |
| e!NotificationsStatus  | get information about notifications at the current channel | none |
| e!ToggleLaunches  | toggle launch notifications (when enabled, the bot will post information about the next launch at the current channel) | Manage Messages |
| e!ToggleFlickr  | toggle Flickr notifications (when enabled, all newest photos from SpaceX Flickr profile will be posted at the current channel) | Manage Messages |
| e!ToggleReddit  | toggle Reddit notifications (when enabled, the hottest topics from /r/spacex will be posted at the current channel) | Manage Messages |
| e!ToggleElonTwitter  | toggle Elon Musk Twitter notifications (when enabled, all newest tweets from Elon Musk profile will be posted at the current channel) | Manage Messages |
| e!ToggleSpaceXTwitter  | toggle SpaceX Twitter notifications (when enabled, all newest tweets from SpaceX profile will be posted at the current channel) | Manage Messages |
| e!ToggleSpaceXFleetTwitter  | toggle SpaceXFleet Twitter notifications (when enabled, all newest tweets from SpaceXFleet profile will be posted at the current channel) | Manage Messages |

### Time zone
| Command | Description | Required permissions |
|---|---|---|
| e!SetTimeZone  | set the specified time zone (local time will be displayed in the launch information) | Manage Messages |
| e!ResetTimeZone  | reset time zone (local time won't be shown again) | Manage Messages |

### Miscellaneous
| Command | Description | Required permissions |
|---|---|---|
| e!Avatar  | display current Elon Musk's Twitter avatar | none |
| e!Changelog  | get the bot changelog | none |
| e!CompanyHistory  | get a list of the most important events for SpaceX | none |
| e!CompanyInfo  | get information about company | none |
| e!CoreInfo [CoreSerial] | get information about the specified core | none |
| e!Cores | get a list of all cores | none |
| e!GetEvent [EventNumber] | get information about the event with the specified id (which can be obtained by e!CompanyHistory) | none |
| e!Launchpads  | get a list of all launchpads used by SpaceX | none |
| e!Links  | get a list useful links related with SpaceX | none |
| e!Ping  | pong | none |
| e!RandomElonQuote  | get a random Elon Musk's quote | none |
| e!RandomVideo  | get a random video related with SpaceX | none |
| e!Roadster  | get information about Roadster launched by Falcon Heavy | none |
| e!Rockets  | get a list of all rockets used by SpaceX | none |
| e!Uptime  | how long am I working? | none |
