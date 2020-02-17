![Discord Fork Botlist, The botlist with built in GitHub integration](/.github/header.png)

_A Discord Bot List with no dedicated servers, running entirely on Netlify_

## Deploy
Version 3 is not ready for deployment.
<!-- - [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/terminal/discord_fork)
  - By creating a fork, you accept the terms of the LICENCE.
- [View builds](https://app.netlify.com/sites/discordbots/deploys) -->

## Requirements
- Node.js 13.x

## Commands
```
gatsby develop
  Start the development server

gatsby build
  Build Discord_Fork
```

## First Setup
```
git clone [repo]
npm i -g gatsby
npm i
gatsby develop
```

### Authentication Server
Authentication is now handled by an AWS Lambda function.

To set up authentication:

1. Open Netlify
2. Inside `Settings`, click `Build & Deploy`
3. Scroll down to `Build environment variables`, and enter relevant values for `CLIENT_ID` and `CLIENT_SECRET` from GitHub OAuth.

![Image showing the "Build Environment Variables" box](/.github/env.png)

Set `https://discordbots.co.uk/edit` as your callback URL in GitHub.

## Thanks
[View all dependencies which made Discord_Fork possible](https://github.com/Terminal/Discord_Fork/network/dependencies)

## Technical Support
Please understand the terms of the licence before asking for support.

[Technical Support Chat](https://discord.gg/8uC6aKZ)
