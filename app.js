const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// mongod --dbpath=/usr/local/mongodb/bin
const port = 3000;
mongoose.connect("mongodb://localhost:27017/randomDB", { useUnifiedTopology: true, useNewUrlParser: true });

const credentialSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});


const User = mongoose.model("User", credentialSchema);

var user = new User ({
    email: "",
    password: ""
});

// User.findOne({email: "email@hotmail.com"}, function (err, user){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(user)
//     }
// });

function dbQuery(userEmail, userPassword) {
    User.findOne({email: email}, function (err, user){
        if (err) {
            console.log("This email has already been registered with " + userEmail);
            return false;
        } else {
            return true;
        }
    });
}

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    email = req.body.email;
    password = req.body.password;
    console.log(email);
    console.log(password);
    User.findOne({email: email}, function (err, user){
        if (err) {
            console.log("This email has already been registered with " + userEmail);
            res.sendFile(__dirname + "/index.html")
            return
        }
    }); 
    user = new User ({
        email: email,
        password: password
    });
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Successfully sent database query");
    });
    console.log("you have successfully registered")
    res.sendFile(__dirname + "/login.html")
});

app.listen(3000, () => {
    console.log("Express app running on port: $(port)");
});