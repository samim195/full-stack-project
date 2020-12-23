const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

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