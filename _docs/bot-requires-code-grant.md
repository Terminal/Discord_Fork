---
pagename: '"Bot requires code grant" error when inviting Discord Bots'
---

# "Bot requires code grant" when inviting Bots
When inviting a bot, you may encounter the following screen:

![An image of the "Bot requires code grant" screen](/assets/images/invite/code_grant.png)

This is caused by the owner of the bot misconfiguring the configuration of their bot.

You will therefore not be able to invite the bot.
[Please find us on Discord]({{ site.data.links.discord }}) and tell us about where you found the error.

## For bot owners
Go onto the Discord Developers page, and uncheck the "Require OAuth2 Code Grant" option.
This will rectify the problem your users have inviting your bot.

![An animated video of the option being de-selected, and then saved](/assets/images/invite/unclick_code_grant.gif)
