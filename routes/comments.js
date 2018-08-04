/************ ROUTE  FILE FOR COMMENTS *****************/

/**** INITIAL SETUP ******/
var
     express = require("express"),
     router = express.Router({ mergeParams: true }),
     Campground = require("../models/campground"),
     Comment = require("../models/comment"),
     middleware = require("../middleware");


/************ HANDLING CREATE COMMENT ******************/
// CREATE COMMENT FORM 'GET' ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {

     // FIND CAMPGROUND BY ID
     Campground.findById(req.params.id, function(err, campground) {
          if (err) {
               console.log(err);
          }
          else {
               // SHARE THE CAMPGROUND OBJECT WITH VIEW
               res.render("comments/new", { campground: campground });
          }
     });
});


// CREATE COMMENT 'POST' REQUEST
router.post("/", middleware.isLoggedIn, function(req, res) {

     // LOOK UP CAMPGROUND USING ID
     Campground.findById(req.params.id, function(err, campground) {
          if (err) {
               console.log(err);
               res.redirect("/campgrounds");
          }
          // CREATE NEW COMMENT
          else {
               // USING OBJECT MADE IN NEW.EJS FORM
               Comment.create(req.body.comment, function(err, comment) {
                    if (err) {
                         req.flash("error", "Something went wrong!");
                         console.log("ERROR ADDING NEW COMMENT!!! " + comment);
                         console.log(err);
                    }
                    else {

                         // ADD USERNAME AND ID TO COMMENT
                         comment.author.id = req.user._id;
                         comment.author.username = req.user.username;

                         // SAVE COMMENT
                         comment.save();

                         // ADD COMMENT TO CAMPGROUND
                         campground.comments.push(comment);
                         campground.save();

                         // FLASH MESSAGE OF SUCCESS
                         req.flash("success", "Successfully added comment!");
                         // REDIRECT TO CAMPGROUND SHOW PAGE
                         res.redirect("/campgrounds/" + campground._id);
                    }
               });
          }
     });
});

/****************** HANDLING EDIT OR DELETE COMMENT *************/

// EDIT FORM ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
     Comment.findById(req.params.comment_id, function(err, foundComment) {
          if (err) {
               res.redirect("back");
          }
          else {
               res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
          }
     });
})

// EDIT FORM ROUTE HANDLING
router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res) {
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
          if (err)
               res.redirect("back");
          else
               res.redirect("/campgrounds/" + req.params.id);
     });
});

// DELETE COMMENT FROM CAMPGROUND
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {

     Comment.findByIdAndRemove(req.params.comment_id, function(err) {

          if (err) {
               console.log(err);
               res.redirect("back");
          }
          else {
               req.flash("success", "Comment Deleted!")
               res.redirect("/campgrounds/" + req.params.id);
          }

     });

});

// MODULE EXPORTS
module.exports = router;
