require("dotenv").config();
const keys = require('./keys.js')
let [nope, morenope, thingtodo, input, ...idc] = process.argv
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');
var client2 = new spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require('fs')




let liri = {
    my_tweets: (input) => {
        var params = { screen_name: '@smartassrob', count: 20 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log("Last 20 Tweets");
                for (i = 0; i < tweets.length; i++) {
                    console.log(i + 1 + ". " + tweets[i].text)
                    fs.appendFile('./log.txt', i + 1 + ". " + tweets[i].text, 'utf8', (error) => {
                        if (error) throw err;
                    })
                }
            } else {
                console.log(error)
            }
        });
    },
    spotify_this_song: (input) => {
        spotify.search({ type: 'track', query: search }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            //Just testing if data is being pulled
            console.log(data)
        });
    },
    movie_this: (input) => {
        //this is not compelted
    },
    do_what_it_says: (input) => {
        // this is not completed
    },
}

let dostuff = () => {
    liri[thingtodo](input)
}
dostuff();
