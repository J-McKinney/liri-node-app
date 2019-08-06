//Ah ah ah, you didn't say the magic word...
require("dotenv").config();

//variables
var keys = require("./keys.js");
// var spotify = new spotify(keys.spotify);
// var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var userOption = process.argv[2];
var nodeArgs = process.argv;
var userParameter = "";
for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        userParameter = userParameter+ "+" +nodeArgs[i];
    }
}
// var userParameter = process.argv[3];
var moment = require("moment");
moment().format();

userInput(userOption, userParameter);

//Functions
function userInput(userOption, userParameter) {
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

function movieInfo(userParameter) {
    if (!userParameter) {
        userParameter = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userParameter + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var movieResults =
            "======================" +
            "\nMovie Title: " + response.data.Title +
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
    })
    .catch(function (error) {
        console.log(error);
    });
};

