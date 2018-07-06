'use strict';

var Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Twitter = {
  post: async (status_tweet) => {
   try{
    status_tweet.image.then(function(value) {
      update({ status:value.key + value.url, image:value.image });
    });
   }
   catch (err){
    console.log(err);
   } 
  },

  reply: async (reply_tweet) => {
    try{
      console.log(reply_tweet);
      reply_tweet.image.then(function(value){
        console.log(value);
        console.log(reply_tweet);
        console.log(reply_tweet.getText());
        //console.log(reply_tweet.getImage());
        update({ status: reply_tweet.getText(), image: value.image, in_reply_to_status_id: reply_tweet.getInReplyToStatusID() });

      });
    }catch(err){
      console.log(err);
    }
  },

//returns event listener
  stream: () => {
    return twit.stream('user');
  }
};

//makes a new tweet
async function update(params) {
  var param = await params;
  console.log(param);
  twit.post('media/upload', {media_data: param.image}, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('tweeting...');

      twit.post('statuses/update', {
        status: param.status ,
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

module.exports = Twitter;