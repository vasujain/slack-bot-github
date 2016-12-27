/**
 * A Github Bot for Slack ! 
 * @author: Vasu Jain
 */

// Libraries
var https = require('https');
var Botkit = require("botkit");
var BotConfig = require('./config.json');

function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({
            user: installer
        }, function(err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
            }
        });
    }
}

var controller = Botkit.slackbot({
    debug: false
});

var slackTokenEncrypted = BotConfig.admin_config.slack.slack_token_encrypted;
var slackTokenBuf = new Buffer(slackTokenEncrypted, 'base64');
var token = slackTokenBuf.toString("ascii");

if (token) {
    controller.spawn({
        token: token
    }).startRTM(function(err, bot, payload) {
        console.log("Loaded config parameters from config.json ");
        if (err) {
            console.log(err);
            throw new Error(err);
        }
    });
} 

// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function(bot) {
    console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function(bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});

controller.on('bot_channel_join', function(bot, message) {
    bot.reply(message, "Thank you for inviting me to your Slack Channel!");
});

controller.hears(['hello', 'hi', 'greetings'], ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("Hello Human !! ");
    bot.reply(message, 'Hello Human !!');
});

controller.hears('github (.*) (.*)', ['direct_mention', 'mention', 'direct_message'], function(bot, message) {
    console.log("team: " + message.match[1]);
    console.log("repo: " + message.match[2]);
    // Making a Github API call -- This can be changed to make any API call based on trigger words 
    // Implementation for this can be found in util.js
    githubApiCall(bot, message, message.match[1], message.match[2]);
});
