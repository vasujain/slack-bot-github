// Bot Error Handler
function botErrorHandler(err, bot, message) {
    console.log("\n" + err);
    var errText = ":rotating_light: " + err;
    bot.reply(message, {
        "attachments": [{
            "fallback": err,
            "color": "#FF0000",
            "title": Error,
            "text": errText
        }]
    });
}

function slackMsgHandler(bot, message, header) {
    var header = ":rotating_light: over riding header";
    bot.reply(message, {
        "attachments": [{
            "fallback": header,
            "color": "#36a64f",
            "title": header,
            "text": header
        }]
    });
}

function githubApiCall(bot, message, team, repo) {
    var githubToken = "token " + BotConfig.admin_config.github.github_token_encrypted;
    var http = require("https");
    var path = /repos/ + team + "/" + repo + "/pulls";
    var options = {
      "method": "GET",
      "hostname": "api.github.com",
      "port": null,
      "path": path,
      "headers": {
        "accept": "application/vnd.github.v3+json",
        "Authorization": githubToken,
        "User-Agent": "slackbot"
      }
    };

    var req = http.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        constructSlackResponse(bot, message, body);
      });
    });

    req.end();
}

function constructSlackResponse(bot, message, jsonRaw) {
    var jsonObj = JSON.parse(jsonRaw);
    var objLength = jsonObj.length;
    var response = "";
    var header = ":rotating_light: Github PR Response: ";
    for(var i=0; i<objLength; i++) {
        response += "\n PR# " + jsonObj[i].number + " - " + jsonObj[i].title + "\n " + jsonObj[i].html_url; 
    }
    console.log(response);
    slackMsgHandler(bot, message, header, response);
}

function slackMsgHandler(bot, message, header, response) {
    bot.reply(message, {
        "attachments": [{
            "fallback": header,
            "color": "#36a64f",
            "title": header,
            "text": response
        }]
    });
}