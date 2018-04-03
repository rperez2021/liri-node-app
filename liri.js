require("dotenv").config();
const keys = require('./keys.js')
let [nope, morenope, thingtodo, input, ...idc] = process.argv
var Twitter = require('twitter')
var client = new Twitter(keys.twitter);
var fs = require('fs')
// var spotify = new spotify(keys.spotify);




let liri = {
    my_tweets: (input) => {
        var params = {screen_name: '@smartassrob', count: 20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            console.log("Last 20 Tweets");
            for (i = 0; i < tweets.length; i++) {
                console.log(i+1 +". " + tweets[i].text)
                fs.appendFile('./log.txt', i+1 +". " + tweets[i].text, 'utf8', (error) => {
            if (error) throw err;
            } )
            }
          } else {
              console.log(error)
          }
        });
    },
    spotify_this_song: (input) => {

    },
    movie_this: (input) => {

    },
    do_what_it_says: (input) => {

    },
}

let dostuff = () => {
    liri[thingtodo](input)
}
dostuff();
