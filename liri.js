//Ah ah ah, you didn't say the magic word...
require("dotenv").config();

//variables
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
var userOption = process.argv[2];
var modifiedArray = [];
for (let i = 2; i < process.argv.length; i++) {
    modifiedArray.push(process.argv[i]);
}
var com = modifiedArray[0];
var parameterArray = [];
for(let i = 1; i < modifiedArray.length; i++){
    parameterArray.push(modifiedArray[i]);
}
var userParameter = parameterArray.join("+");

userInput(userOption, userParameter);

//Switch statement
function userInput(userOption, userParameter) {
    console.log(userParameter);
    switch (userOption) {
        case "concert-this":
            concertInfo(userParameter);
            break;
        case "spotify-this":
            songInfo(userParameter);
            break;
        case "movie-this":
            movieInfo(userParameter);
            break;
        case "do-what-it-says":
            someInfo(userParameter);
            break;
        default:
        console.log("Ah ah ah, you didn't say the magic word... \n Try concert-this, spotify-this, movie-this, or do-what-it-says")
    }
}
//movie function
function movieInfo(userParameter) {
    if (!userParameter) {
        userParameter = "Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userParameter + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var movieResults =
            "\n==============================" +
            "\nMovie Title: " + response.data.Title +
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors/Actresses: " + response.data.Actors;
        console.log(movieResults);
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
    axios.get("https://rest.bandsintown.com/artists/" + userParameter + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var momentTime = moment(response.data[i].datetime).format("MM/DD/YYYY HH:mm")
            var concertResults =
                "\n==============================" +
                "\nVenue Name: " + response.data[i].venue.name +
                "\nVenue Location: " + response.data[i].venue.city +
                "\nDate of the Event: " + momentTime;
            console.log(concertResults);
            fs.appendFileSync("log.txt", concertResults);
        }
    }).catch(function (error) {
        console.log(error);
    })
}
//spotify function
function songInfo(userParameter) {
    if(!userParameter){
        userParameter = "The Sign";
    }
    spotify.search({ type: 'track', query: userParameter }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "\n==============================" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
            fs.appendFileSync("log.txt", spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}
// do-what-it-says function
function someInfo(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        userInput(dataArr[0], dataArr[1]);
	});
}