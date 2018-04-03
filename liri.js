import { twitter } from "./keys.js";

require("dotenv").config();
const keys = require('./keys.js')
let [nope, morenope, thingtodo, input, ...idc] = process.argv

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let dostuff = () => {
    liri[thingtodo](input)
}

let liri = {
    my_tweets: (input) => {
        var params = {screen_name: '@smartassrob'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            console.log(tweets);
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
