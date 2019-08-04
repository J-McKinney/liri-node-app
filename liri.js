//Ah ah ah, you didn't say the magic word...
require("dotenv").config();

//variables
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var userOption = process.argv[2];
var userParameter = process.argv[3];

userInput(userOption, userParameter);

//Functions
function userInput(userOption, userParameters) {
    switch (userOption) {
        case "concert-this":
            concertInfo(userParameter);
            break;
        case "spotify-this-song":
            songInfo(userParameter);
            break;
        case "movie-this":
            movieInfo(userParameter);
            break;
        case "do-what-it-says":
            someInfo();
            break;
        default:
            console.log("Ah ah ah, you didn't say the magic word...")
    }
}