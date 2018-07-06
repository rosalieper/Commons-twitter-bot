'use strict';

const Images = require('../src/images');
const Twitter = require('../src/twitter');
const ReplyTweet = require('../src/tweets/reply_tweet');
const RequestTweet = require('../src/tweets/request_tweet');

let stream = Twitter.stream();

//payload execute when the bot gets a tweet
stream.on('tweet', (payload) => {
  let request_tweet = new RequestTweet(payload);

  if (request_tweet.shouldReply()) {
  	console.log('Should reply...');
    let image = new Images().getFromText(request_tweet.getText());
    if (!image) { return; }
    console.log("yes reply");
    let reply_tweet = new ReplyTweet(request_tweet, image);
    Twitter.reply(reply_tweet);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});
