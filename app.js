const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rp = require("request-promise");
const http = require("http");
const { response } = require("express");
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

function callApi() {
    console.log("btccccccccccccc");
}

function dbQuery(userEmail, userPassword) {
    User.findOne({email: userEmail}, function (err, user){
        if (err) {
            console.log("This email has already been registered with " + email);
            return false;
        } else {
            return true;
        }
    });
}

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({ limit: '1mb' }));

app.get(["/", "/home"], function(req, res) {
    res.sendFile(__dirname + "/home.html");
})

app.get("/register", function(req, res){
    res.sendFile(__dirname + "/register.html");
});

app.post("/register", function(req, res) {
    email = req.body.email;
    console.log("register email " + email);
    password = req.body.password;
    console.log(email);
    console.log(password);
    User.findOne({email: email}, function (err, user){
        console.log(user)
        dbUser = user;
        if (err) {
            console.log(err);
            console.log("This email has already been registered with " + email);
            res.redirect("/register")
            // res.sendFile(__dirname + "/index.html")
            return
        }
        if (email === user['email']) {
            console.log("User exists, please login");
            res.redirect("login");
            return;
        };
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
        res.redirect("/login")
        // res.sendFile(__dirname + "/login.html")
    }); 
});

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", function(req, res) {
    email = req.body.emailLogin;
    password = req.body.passwordLogin;
    console.log(email);
    var dbUser;
    var dbPassword;
    User.findOne({email: email}, function(err, user) {
        if (err) {
            console.log(err);
            return;
        };
        console.log("-------------")
        console.log(user);
        dbUser = user['email'];
        dbPassword = user['password']
        if (email === user['email'] && password === user['password']){
            console.log(" user in database matches email entered");
            res.redirect('/home')
        }
    });
});

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start' : '1',
        'limit' : '10',
        'convert' : 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': '84a48385-9cb0-467f-9a63-09b640b2db75'
    },
    json: true,
    gzip: true
};

app.get("/crypto", function(req, res) {
    res.sendFile(__dirname + "/crypto.html");
});

app.post("/crypto", function(req, res) {
    var value = req.body.v;
    console.log(value);
    var results;
    rp(requestOptions).then(response => {
        // console.log('API call response:', response['data'][0]);
        if (value === "btc") {
            results = console.log(response['data'][0]);
        } else if(value === "xrp") {
            results = console.log(response['data'][3]);
        }
        res.json({
            status: "success",
            values: results
        });
    }).catch((err) => {
        console.log('API call error:', err.message);
    });

    // console.log(res);
});

app.listen(3000, () => {
    console.log("Express app running on port: $(port)");
});