'use strict';
var Alexa = require('alexa-sdk');
var http = require ('http');

// var APP_ID = "";

var SKILL_NAME = "vivit_jcになれる";
var GET_FACT_MESSAGE = "";
var HELP_MESSAGE = "vivit_jcになりましょう";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {

        var thiz = this;
        var speechOutput = 'ゲーム作りたい';
        http.get("http://vivitjcninareru.herokuapp.com/api/nareru?type=readable", function(res) {
            res.on("data", function(chunk) {
                var speechOutput = chunk.toString('utf8');
                console.log(speechOutput);
                thiz.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
            });
        }).on('error', function(e) {
            console.log(e);
            thiz.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput)
        });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
