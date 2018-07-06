'use strict';

class StatusTweet {
	//constructor takes an image object
  constructor(image) {
    this.image = image;
  }

//return image key and url
  async getText() {
    try{
     return `${this.image.key} ${this.image.toString()}`;  
    }catch(err){
     console.log(err);
    }
  }
  async getImage(){
    try{
      return `${this.image.image}`;
    }catch(err){
      console.log(err);
    }
      
  }
}


module.exports = StatusTweet;
