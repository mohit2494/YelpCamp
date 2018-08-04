/************ ROUTE  FILE FOR INDEX *****************/

/**** INITIAL SETUP ******/
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res) {
     res.render("landing");
});

/************ AUTHORIZATION ROUTES ***********/

// REGISTER FORM
router.get("/register", function(req, res) {
     res.render("register");
});

// HANDLE REGISTER 'POST' REQUEST
router.post("/register", function(req, res) {

     // NEW USER OBJECT
     var newUser = new User({ username: req.body.username });

     // REGISTER NEW USER AND SAVE HASH OF PASSWORD IN MONGODB
     User.register(newUser, req.body.password, function(err, user) {
          if (err) {

               /* IF ERROR, THEN RETURN TO REGISTER PAGE */
               req.flash("error", err.message);
               return res.redirect("register");
          }
          else {
               /* AUTHENTICATE USER WITH LOCAL STRATEGY */
               passport.authenticate("local")(req, res, function() {
                    req.flash("success", "Welcome to YelpCamp" + user.username);
                    res.redirect("/campgrounds");
               });
          }
     });
});

/********* ADDING LOGIN ROUTES ************/
router.get("/login", function(req, res) {
     res.render("login");
});

/* LOGIN WORKS THROUGH MIDDLEWARE */
router.post("/login", passport.authenticate(
     "local", {
          successRedirect: "/campgrounds",
          failureRedirect: "/login"
     }
), function(req, res) {

     //  HANDLING LOGIN LOGIC
     res.send("Login Logic Happens here !");
});

/* LOGOUT REQUEST */
router.get("/logout", function(req, res) {
     req.logout();
     req.flash("success", "Logged you out!!");
     res.redirect("/campgrounds");
})

// MODULE EXPORTS
module.exports = router;
