const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 9000,
    // socketPath: 'mysql-socket-path',
    database: 'randomsapp'
});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log("Successfully connected to the MySQL Server");
})

connection.end(function(err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (function(req, res) {
    console.log(req.body.body);
    console.log("you have successfully registered")
    res.sendFile(__dirname + "/login.html")
}));

app.listen(3000, () => {
    console.log("Express app running on port: $(port)");
});