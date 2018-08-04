/************** THIS FILE CONTAINS ALL THE MIDDLEWARE *************/

var
     middlewareObj = {},
     Campground = require("../models/campground"),
     Comment = require("../models/comment");


/****************** MIDDLEWARE FOR AUTHORIZED CAMPGROUND ********************/
middlewareObj.checkCampgroundOwnership = function(req, res, next) {

     // CHECK IF USER IS AUTHENTICATED
     if (req.isAuthenticated()) {
          Campground.findById(req.params.id, function(err, foundCampground) {
               if (err) {
                    req.flash("error", "Campground not found");
                    res.redirect("back");
               }
               else {
                    // CHECK IF USER IS AUTHORIZED TO EDIT CAMPGROUND
                    if (foundCampground.author.id.equals(req.user._id)) {
                         next();
                    }
                    else {
                         req.flash("error", "You don't have permission to do that!");
                         res.redirect("back");
                    }
               }
          });
     }
     else {
          // THIS WILL TAKE USER BACK TO WHERE THEY CAME FROM
          req.flash("error", "You need to be logged in to do that!");
          res.redirect("back");
     }

}

/*********** CHECK COMMENT OWNERSHIP MIDDLEWARE() *********/
middlewareObj.checkCommentOwnership = function(req, res, next) {
     // CHECK IF USER IS AUTHENTICATED
     if (req.isAuthenticated()) {
          Comment.findById(req.params.comment_id, function(err, foundComment) {
               if (err) {
                    console.log(err);
                    res.redirect("back");
               }
               else {
                    // CHECK IF USER IS AUTHORIZED TO EDIT CAMPGROUND
                    if (foundComment.author.id.equals(req.user._id)) {
                         next();
                    }
                    else {
                         req.flash("error", "You don't have permission to do that!");
                         res.redirect("back");
                    }
               }
          });
     }
     else {
          // THIS WILL TAKE USER BACK TO WHERE THEY CAME FROM
          req.flash("error", "You need to be logged in to do that!");
          res.redirect("back");
     }
}

/************** MIDDLEWARE ISLOGGEDIN() **************/
middlewareObj.isLoggedIn = function(req, res, next) {
     if (req.isAuthenticated()) {
          return next();
     }
     req.flash("error", "You need to be logged in to do that!");
     res.redirect("/login");
}

// EXPORTING MIDDLEWARE OBJECT
module.exports = middlewareObj;
