import { twitter } from "./keys.js";

require("dotenv").config();
const keys = require('./keys.js')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


