var key = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var prettyLines = "===================================================================================================";
var twitterClient = new Twitter(key.twitterKeys);
var action = process.argv[2];
var argument = process.argv.slice(3).join(" ");
var twitterParams = { screen_name: "organicCircuit", count: 20 };

switch (action) {
    case "my-tweets":
        tweet();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        doIt();
        break;
}

function tweet() {
    twitterClient.get("statuses/user_timeline", twitterParams, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var twitterUserName = tweets[i].user.screen_name;
                var tweetTime = tweets[i].created_at;
                var tweetText = tweets[i].text;

                console.log(prettyLines);
                console.log(twitterUserName);
                console.log(prettyLines);
                console.log(tweetTime);
                console.log(prettyLines);
                console.log(tweetText);
                console.log(prettyLines);
                console.log("\n");

                fs.appendFile("log.txt", prettyLines + "\n" + twitterUserName + "\n" + prettyLines + "\n" + tweetTime + "\n" + prettyLines + "\n" + tweetText + "\n" +
                    prettyLines + "\n",
                    function(err) {
                        if (err) {
                            return console.log(err);
                        } else console.log("Printed to log.txt")
                    })
            }
        } else {
            console.log(error)
        }
    })
}

function spotifySong() {
    if (!argument) {
        spotify.search({ type: "track", query: "ace of base" }, function(err, data) {
            if (err) {
                console.log("Error occured: " + err);
            } else {
                var spotifyArtist = data.tracks.items[0].album.artists[0].name;
                var spotifySong = JSON.stringify(data.tracks.items[0].name, null, 2);
                var spotifyAlbum = JSON.stringify(data.tracks.items[0].album.name, null, 2);
                var spotifyPreview = JSON.stringify(data.tracks.items[0].preview_url, null, 2);

                console.log(prettyLines);
                console.log("Artist: " + spotifyArtist);
                console.log(prettyLines);
                console.log("Song: " + spotifySong);
                console.log(prettyLines);
                console.log("Album: " + spotifyAlbum);
                console.log(prettyLines);
                console.log("Preview Link: " + spotifyPreview);
                console.log(prettyLines);

                fs.appendFile("log.txt", prettyLines + "\n" + spotifyArtist + "\n" + prettyLines + "\n" + spotifySong + "\n" + prettyLines + "\n" + spotifyAlbum + "\n" +
                    prettyLines + "\n" + spotifyPreview + "\n" + prettyLines + "\n",
                    function(err) {
                        if (err) {
                            return console.log(err);
                        } else console.log("Printed to log.txt")
                    })
            }
        })
    } else {
        spotify.search({ type: "track", query: argument }, function(err, data) {
            if (err) {
                console.log("Error occured: " + err);

            } else {
                var spotifyArtist = data.tracks.items[0].album.artists[0].name;
                var spotifySong = JSON.stringify(data.tracks.items[0].name, null, 2);
                var spotifyAlbum = JSON.stringify(data.tracks.items[0].album.name, null, 2);
                var spotifyPreview = JSON.stringify(data.tracks.items[0].preview_url, null, 2);

                console.log(prettyLines);
                console.log("Artist: " + spotifyArtist);
                console.log(prettyLines);
                console.log("Song: " + spotifySong);
                console.log(prettyLines);
                console.log("Album: " + spotifyAlbum);
                console.log(prettyLines);
                console.log("Preview Link: " + spotifyPreview);
                console.log(prettyLines);

                fs.appendFile("log.txt", prettyLines + "\n" + spotifyArtist + "\n" + prettyLines + "\n" + spotifySong + "\n" + prettyLines + "\n" + spotifyAlbum + "\n" +
                    prettyLines + "\n" + spotifyPreview + "\n" + prettyLines + "\n",
                    function(err) {
                        if (err) {
                            return console.log(err);
                        } else console.log("Printed to log.txt")
                    })
            }
        });
    }
};

function movie() {
    if (!argument) {
        request("http://www.omdbapi.com/?t=mr+nobody", function(error, response, body) {
            if (!error) {
                var omdbDefault = JSON.parse(body);
                var statusCode = response.statusCode;
                var movieTitle = omdbDefault.Title;
                var movieYear = omdbDefault.Year;
                var imdbRating = omdbDefault.imdbRating;
                var country = omdbDefault.Country;
                var language = omdbDefault.Language;
                var plot = omdbDefault.Plot;
                var actors = omdbDefault.Actors;
                var rottenTomatoes = omdbDefault.Ratings[1].Value;
                // console.log("Default: ")
                console.log("statusCode: ", statusCode);
                console.log(prettyLines);
                console.log("Title: ", movieTitle);
                console.log(prettyLines);
                console.log("Year: ", movieYear);
                console.log(prettyLines);
                console.log("IMDB Rating: ", imdbRating);
                console.log(prettyLines);
                console.log("Countries: ", country);
                console.log(prettyLines);
                console.log("Language: ", language);
                console.log(prettyLines);
                console.log("Plot: ", plot);
                console.log(prettyLines);
                console.log("Actors: ", actors);
                console.log(prettyLines);
                console.log("Rotten Tomatoes Score: ", rottenTomatoes);
                console.log(prettyLines);

                fs.appendFile("log.txt", prettyLines + "\n" + statusCode + "\n" + prettyLines + "\n" + movieTitle + "\n" + prettyLines + "\n" + movieYear + "\n" +
                    prettyLines + "\n" + imdbRating + "\n" + prettyLines + "\n" + country + "\n" + prettyLines + "\n" + language + "\n" + prettyLines + "\n" + plot + "\n" + prettyLines + "\n" + actors + "\n" + prettyLines + "\n" + rottenTomatoes + "\n",
                    function(err) {
                        if (err) {
                            return console.log(err);
                        } else console.log("Printed to log.txt")
                    })

            } else {
                console.log("Error: ", error);
            }
        })
    } else {
        request("http://www.omdbapi.com/?t=" + argument, function(error, response, body) {
            if (!error) {
                var omdbDefault = JSON.parse(body);
                var statusCode = response.statusCode;
                var movieTitle = omdbDefault.Title;
                var movieYear = omdbDefault.Year;
                var imdbRating = omdbDefault.imdbRating;
                var country = omdbDefault.Country;
                var language = omdbDefault.Language;
                var plot = omdbDefault.Plot;
                var actors = omdbDefault.Actors;
                var rottenTomatoes = omdbDefault.Ratings[1].Value;
                // console.log("Default: ")
                console.log("statusCode: ", statusCode);
                console.log(prettyLines);
                console.log("Title: ", movieTitle);
                console.log(prettyLines);
                console.log("Year: ", movieYear);
                console.log(prettyLines);
                console.log("IMDB Rating: ", imdbRating);
                console.log(prettyLines);
                console.log("Countries: ", country);
                console.log(prettyLines);
                console.log("Language: ", language);
                console.log(prettyLines);
                console.log("Plot: ", plot);
                console.log(prettyLines);
                console.log("Actors: ", actors);
                console.log(prettyLines);
                console.log("Rotten Tomatoes Score: ", rottenTomatoes);
                console.log(prettyLines);

                fs.appendFile("log.txt", prettyLines + "\n" + statusCode + "\n" + prettyLines + "\n" + movieTitle + "\n" + prettyLines + "\n" + movieYear + "\n" +
                    prettyLines + "\n" + imdbRating + "\n" + prettyLines + "\n" + country + "\n" + prettyLines + "\n" + language + "\n" + prettyLines + "\n" + plot + "\n" + prettyLines + "\n" + actors + "\n" + prettyLines + "\n" + rottenTomatoes + "\n",
                    function(err) {
                        if (err) {
                            return console.log(err);
                        } else console.log("Printed to log.txt")
                    })
            } else {
                console.log("Error: ", error);
            }
        })
    }
};

function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArray = data.split(",");
        action = dataArray[0];
        argument = dataArray[1];
        console.log(spotifySong());
    });
};