# Github Slack Bot

## What is Github Slack Bot or What does it do ?
Github Slack Bot grabs open pull request details for an organization's repo into Slack using organization name and github repository name as a parameter. 

## Setup Instructions
1. Fork this project.
2. Open up your favorite terminal app, and clone your new repository to your local computer.
3. This is a Node.js project, so you’ll need to install the various dependencies by running: `npm install` to get all the node_modules
4. Update Organization/Repositories/StackOverflow Details in `config.json`.
5. Add a bot Integration to your slack channel at https://{{$slack_channel}}.slack.com/apps/new/A0F7YS25R-bots
6. From the terminal you can run your bot easily:

    ```bash
    TOKEN=xoxb-your-token-here npm start
    ```
 (Copy token from Integration Settings >> API Token)
7. Once started Go to slack and find a new bot user added with the name selected in Step # 5 above. 
8. Start talking to Bot via commands like : 
    github `{$organization_name}` `{$repository_name}` -- Display all open Pull requests in the Github Repos `{$repository_name}` for `{$organization_name}` 
    e.g. github google auto will pull up all open PR's from Google's Auto repo. 

## Support/Request new features
For Support / Requesting new features -- create an issue at https://github.com/vasujain/slack-bot-github/issues  

## Slides from the Presentation at Gitpro Dec 2016 Tech talk
www.slideshare.net/vasujain/chat-bots-and-how-to-build-a-slack-bot