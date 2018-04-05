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
    // commands: (my_tweets, spotify_this, movie_this, do_what_it_says, input) => {
    //     liri.my_tweets(input)
    //     liri.spotify_this(input)
    //     liri.movie_this(input)
    //     liri.do_what_it_says(input)
    // },
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
        var song;
        if (input === "") {
            song = 'The Sign Ace of Base';
        } else {
            song = input;
        }
        var spotify = new Spotify(keys.spotify);
        spotify.search({
            type: 'track',
            query: song
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
        var movie;
        if (input === "") {
            movie = 'Mr Nobody';
        } else {
            movie = input;
        }
        request('http://www.omdbapi.com/?apikey=c4448ae5&t=' + movie, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // * Title of the movie.
                console.log(JSON.parse(body).Title);
                // * Year the movie came out.
                console.log(JSON.parse(body).Year);
                // * IMDB Rating of the movie.
                console.log(JSON.parse(body).Ratings[0].Source + ":", JSON.parse(body).Ratings[0].Value);
                // * Rotten Tomatoes Rating of the movie.
                console.log(JSON.parse(body).Ratings[1].Source + ":", JSON.parse(body).Ratings[1].Value);
                // * Country where the movie was produced.
                console.log(JSON.parse(body).Country);
                // * Language of the movie.
                console.log(JSON.parse(body).Language);
                // * Plot of the movie.
                console.log(JSON.parse(body).Plot);
                // * Actors in the movie.
                console.log(JSON.parse(body).Actors);
            }
        });
    },

    do_what_it_says: (input) => {
        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        fs.readFile('random.txt', 'utf8', (err, data) => {
        
            if (err) throw err;
            var dataArray = data.split(',');
            var command = dataArray[0].trim();
            var input = dataArray[1].trim();
            //THIS IS THE PART I AM HAVING ISSUES WITH: 
            liri[dataArray[0].trim()](dataArray[1].trim())
        });
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