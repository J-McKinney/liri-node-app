//Ah ah ah, you didn't say the magic word...
require("dotenv").config();

//variables
var keys = require("./keys");
var spotify = new spotify(keys.spotify);
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
var userOption = process.argv[2];
var userParameter = process.argv[3];
// var nodeArgs = process.argv;
// var userParameter = "";
// for (var i = 2; i < nodeArgs.length; i++) {
//     if (i > 2 && i < nodeArgs.length) {
//         userParameter = userParameter +"+"+ nodeArgs[i];
//     }
// }

userInput(userOption, userParameter);

//Switch statement
function userInput(userOption, userParameter) {
    console.log(userParameter);
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
//movie function
function movieInfo(userParameter) {
    var nodeArgs = process.argv;
    userParameter = "";
    for (var i = 2; i < nodeArgs.length; i++) {
        if (i > 2 && i < nodeArgs.length) {
            userParameter = userParameter + "+" + nodeArgs[i];
        }
    }
    if (!userParameter) {
        userParameter = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userParameter + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var movieResults =
            "\n======================" +
            "\nMovie Title: " + response.data.Title +
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors/Actresses: " + response.data.Actors;
        console.log(movieResults);
        fs.appendFileSync("log.txt", "\n===================");
        fs.appendFileSync("log.txt", movieResults);
    })
        .catch(function (error) {
            console.log(error);
        });
};
//concert function
function concertInfo(userParameter) {
    if (!userParameter) {
        userParameter = "guns n' roses";
    }
    // var queryURL = ("https://rest.bandsintown.com/artists/" + userParameter + "/events?app_id=codingbootcamp");
    axios.get("https://rest.bandsintown.com/artists/" + userParameter + "/events?app_id=codingbootcamp").then(function (response) {
        // var data = response.data;
        for (var i = 0; i < response.data.length; i++) {
            var concertResults =
                "\n===========================" +
                "\nVenue Name: " + response.data[i].venue.name +
                "\nVenue Location: " + response.data[i].venue.city +
                "\nDate of the Event: " + response.data[i].datetime;
            console.log(concertResults);
            fs.appendFileSync("log.txt", "\n===================");
            fs.appendFileSync("log.txt", concertResults);
        }
    }).catch(function (error) {
        console.log(error);
    })
}

function songInfo(userParameter) {
    if(!value){
        value = "The Sign";
    }
    spotify.search({ type: 'track', query: userParameter }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "\n===================================" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}