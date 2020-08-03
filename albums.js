var mysql = require("mysql");
var inquirer = require("inquirer");
var myQuery = 'SELECT Top5000.year, TopAlbums.position, Top5000.artist, Top5000.song, TopAlbums.album_name FROM Top5000 inner JOIN TopAlbums ON Top5000.artist = TopAlbums.artist and Top5000.year = TopAlbums.year and Top5000.artist = ? ORDER BY Top5000.ARTIST, Top5000.year';


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "top_songsDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    albumSearch();
});

function albumSearch() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which Artist Would you like to search?",
            name: "artistSearch",
        }
    ]).then(function (artist) {
        var query = connection.query(myQuery, artist.artistSearch, function (err, res) {
            if (err) throw err;
            // for (var i = 0; i < res.length; i++) {
            //     console.log((i + 1) + ".)" + "Year:" + res[i].year + " | " + res[i].position + " | " + res[i].artist + " |" + res[i].song + " |" + res[i].album_name);
            res.forEach((song,index) => console.log(`${index + 1}.) Year: ${song.year} || Album Position: ${song.position} || Artist: ${song.artist} || Song: ${song.song} || Album: ${song.album_name}`));
        })
        connection.end();
    })
};