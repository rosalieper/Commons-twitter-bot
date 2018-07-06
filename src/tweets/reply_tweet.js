'use strict';

const findModifier = require('../find_modifier');

class ReplyTweet {
  constructor(request_tweet, image) {
    this.request_tweet = request_tweet;
    this.image = image;
  }

  async getText() {
    let hello = await this.image;
    return `@${this.request_tweet.getScreenName()} ${this.getEmojiWithModifier()} ${hello.url}`;
  }

  /**
   * If a Fitzpatrick modifier is found in the request tweet, combines it with the image key
   */
  async getEmojiWithModifier() {
    let hello = await this.image;
    let key = hello.key;
    let modifier = findModifier(key, this.request_tweet.getText());
    return modifier ? (key + modifier) : key;
  }

  getInReplyToStatusID() {
    return this.request_tweet.getStatusID();
  }

  async getImage(){
    let hello = await this.image;
    return hello.image;
  }
}

module.exports = ReplyTweet;
