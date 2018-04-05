require("dotenv").config();
const keys = require('./keys.js')
let [nope, morenope, thingtodo, ...input] = process.argv
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
let request = require("request")

var client = new Twitter(keys.twitter);
var fs = require('fs')
input = input.join(" ")




let liri = {
    my_tweets: (input) => {
        console.log("hi")
        var params = {
            screen_name: '@smartassrob',
            count: 20
        };
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
    spotify_this: (input) => {
        var spotify = new Spotify(keys.spotify);
        spotify.search({
            type: 'track',
            query: input
        }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log(data.tracks.items[0].album.artists[0].name)
            console.log(data.tracks.items[0].name)
            console.log(data.tracks.items[0].external_urls.spotify)
            console.log(data.tracks.items[0].album.name)
        });
    },
    movie_this: (input) => {
        request('http://www.omdbapi.com/?apikey=c4448ae5&t=' + input, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', JSON.parse(body).Released); // Print the HTML for the Google homepage.
        });
    },

    do_what_it_says: (input) => {
        // this is not completed
        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // Feel free to change the text in that document to test out the feature for other commands.
    },
}

// let dostuff = () => {
//     liri[thingtodo](input)
// }
// dostuff();

if (thingtodo === "my_tweets") { 
    liri.my_tweets(input);
} else if (thingtodo === "spotify_this") {
    liri.spotify_this(input);
} else if (thingtodo === "movie_this") {
    liri.movie_this(input)
} else if (thingtodo === "do_what_it_says") {
    liri.do_what_it_says(input);
} else {
    console.log("that is not a valid command")
}