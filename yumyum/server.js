// Dependencies
const express = require("express");
var admin = require("firebase-admin");

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Static Directory
app.use(express.static("public"));

// Configure and Initialize Firebase for Authentication
var serviceAccount = require("./config/yumyum-project3-firebase-adminsdk-3dmi8-7a523c5d45.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yumyum-project3.firebaseio.com"
});

// Requiring our Models for Syncing
var db = require("./models");

// Parse Request Body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

// Syncing Sequelize Models
db.sequelize.sync().then(function () {
    // Starting Express app
    app.listen(PORT, function () {
        console.log("Server listening at localhost:" + PORT);
    });
});


// call to github jobs API needs to happen on the server side
// helpful code that needs to be examined more:
