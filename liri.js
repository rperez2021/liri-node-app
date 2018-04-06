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
        var params = {
            screen_name: '@smartassrob',
            count: 20
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log("Last 20 Tweets");
                fs.appendFile('./log.txt', 'LOG ENTRY ' + Date() + '\r\n' + 'Command Used: my_tweets: \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
                for (i = 0; i < tweets.length; i++) {
                    console.log(i + 1 + ". " + tweets[i].text)
                    fs.appendFile('./log.txt', i + 1 + ". " + tweets[i].text + '\r\n', 'utf8', (error) => {
                        if (error) throw error;
                    })
                }
                fs.appendFile('./log.txt', 'END OF ENTRY \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
            } else {
                console.log(error)
                fs.appendFile('./log.txt', 'ENCOUNTERED ERROR ' + error + '\r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
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
        }, function (error, data) {
            if (!error) {
                fs.appendFile('./log.txt', 'LOG ENTRY ' + Date() + '\r\n' + 'Command Used: spotify_this: \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
                console.log("Here is the info on the song you requested:");
                console.log('Artist Name:', data.tracks.items[0].album.artists[0].name)
                console.log('Track Name:', data.tracks.items[0].name)
                console.log('URL:', data.tracks.items[0].external_urls.spotify)
                console.log('Album Name:', data.tracks.items[0].album.name)
                fs.appendFile('./log.txt', 'Song Information:\r\n' + 'Artist Name: ' + data.tracks.items[0].album.artists[0].name + '\r\n' +
                    'Track Name: ' + data.tracks.items[0].name + '\r\n' + 'URL: ' + data.tracks.items[0].external_urls.spotify + '\r\n' +
                    'Album Name: ' + data.tracks.items[0].album.name + '\r\n', 'utf8', (error) => {
                        if (error) throw error;
                    })
                fs.appendFile('./log.txt', 'END OF ENTRY \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
            } else {
                console.log('Oops an error occurred: ' + error);
                fs.appendFile('./log.txt', 'ENCOUNTERED ERROR ' + error + '\r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
                return;

            }
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
            //Had to add a third operator for false due to the weirdness of the omdb api.
            if (!error && response.statusCode == 200 && JSON.parse(body).Response != 'False') {
                fs.appendFile('./log.txt', 'LOG ENTRY ' + Date() + '\r\n' + 'Command Used: movie_this: \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
                // * Title of the movie.
                console.log(JSON.parse(body).Response)
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
                fs.appendFile('./log.txt', 'Movie Information:\r\n' + 'Movie Title: ' + JSON.parse(body).Title + '\r\n' +
                    'Release Year: ' + JSON.parse(body).Year + '\r\n' + JSON.parse(body).Ratings[0].Source + "Rating: " + JSON.parse(body).Ratings[0].Value + '\r\n' +
                    JSON.parse(body).Ratings[1].Source + "Rating: " + JSON.parse(body).Ratings[1].Value + '\r\n' +
                    'Language: ' + JSON.parse(body).Language + '\r\n' + 'Plot: ' + JSON.parse(body).Plot + '\r\n' +
                    'Actors: ' + JSON.parse(body).Actors + '\r\n', 'utf8', (error) => {
                        if (error) throw error;
                    })
                fs.appendFile('./log.txt', 'END OF ENTRY \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })

            } else {
                console.log('Oops an error occurred: ' + JSON.parse(body).Error);
                fs.appendFile('./log.txt', 'ENCOUNTERED ERROR ' + JSON.parse(body).Error + '\r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
            }

        });

    },

    do_what_it_says: (input) => {
        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        fs.readFile('random.txt', 'utf8', (error, data) => {
            if (error) throw error;
            var dataArray = data.split(',');
            var command = dataArray[0].trim();
            var input = dataArray[1].trim();
            liri[dataArray[0].trim()](dataArray[1].trim())
            fs.appendFile('./log.txt', 'LOG ENTRY ' + Date() + '\r\n' + 'Command Used: do_what_it_says: \r\n' +
                'Other Command Used: ' + command + '\r\n' + 'Input Used: ' + input + '\r\n' + 'END OF ENTRY \r\n', 'utf8', (error) => {
                    if (error) throw error;
                })
        });
    },
}

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
    console.log("try the following commands: my_tweets // spotify_this [track] // " +
        "movie_this [movie] // do_what_it_says")
}