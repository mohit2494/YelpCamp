/********** REQUIRE STATEMENTS *******/
var
     express = require('express'),
     mongoose = require("mongoose"),
     bodyParser = require("body-parser"),
     app = express(),
     seedDB = require("./seeds"),
     methodOverride = require("method-override"),
     flash = require("connect-flash"),
     Campground = require("./models/campground"), // MODEL FILE 
     Comment = require("./models/comment"), // MODEL FILE
     User = require("./models/user"), // MODEL FILE
     passport = require("passport"),
     LocalStrategy = require("passport-local");

/************ ROUTES DEPENDENCY *******************/
var
     commentRoutes = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds"),
     indexRoutes = require("./routes/index");

/******* SEEDING DB ******************/
// seedDB();

app.use(flash());

/******* PASSPORT CONFIGURATION ******/
app.use(require("express-session")({
     secret: "Hack it Bitch!",
     resave: false,
     saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());

/********** AUTHORIZATION *************/
passport.use(new LocalStrategy(User.authenticate())); // USER.AUTHENTICATE METHOD COMES WITH LOCAL-MONGOOSE METHOD
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// PRIMARY SETTINGS
app.set("view engine", "ejs"); // SETTING VIEWING ENGINE TO EJS
mongoose.connect("mongodb://localhost/yelpCamp"); // CONNECTING TO MONGO DB

// BODY PARSER FOR PARSING FORM DATA
app.use(bodyParser.urlencoded({ extended: true }));

// METHOD OVER-RIDE TO PARSE PUT/DELETE REQUESTS
app.use(methodOverride("_method"));

// SERVE STATIC CONTENT
app.use(express.static(__dirname + "/public"));

// SET CURRENT USER FOR USER IN ALL VIEWS
app.use(function(req, res, next) {
     res.locals.currentUser = req.user;
     res.locals.error = req.flash("error");
     res.locals.success = req.flash("success");
     next();
})

/***************** ROUTING INFORMATION *********/
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

/****************** SERVER LISTENER *******************/
app.listen(process.env.PORT, process.env.IP, function() {
     console.log(" THE YELPCAMP SERVER HAS STARTED !!");
});
