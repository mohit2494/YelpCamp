/************ ROUTE  FILE FOR CAMPGROUNDS *****************/

/**** INITIAL SETUP ******/
var
     express = require("express"),
     router = express.Router(),
     Campground = require("../models/campground"),
     Comment = require("../models/comment"),
     middleware = require("../middleware");

// INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {

     // Get all campgrounds from DB
     Campground.find({}, function(err, allCampgrounds) {
          if (err) {
               console.log("ERROR ENCOUNTERED : ");
               console.log(err);
          }
          else {
               res.render("campgrounds/index", { campgrounds: allCampgrounds });
          }
     });
});

// NEW - DISPLAYING FORM FOR ADDING A NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res) {
     res.render("campgrounds/new");
});


// CREATE - ADD A NEW CAMPGROUND TO DB
router.post("/", middleware.isLoggedIn, function(req, res) {

     // GATHER DATA FROM FORM
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var price = req.body.price;

     // MAKE USER OBJECT TO PUSHED INTO CAMPGROUND OBJECT
     var author = {
          id: req.user._id,
          username: req.user.username /* THIS INFORMATION IS BEING COLLECTED FROM LOCAL PASSPORT*/
     }

     // MAKE A NEW CAMPGROUND OBJECT
     var newCampground = { name: name, price: price, image: image, description: desc, author: author };

     // SAVING CAMPGROUND OBJECT
     Campground.create(newCampground, function(err, newlyCreated) {
          if (err) {
               console.log("ERROR : " + err);
          }
          else {
               console.log("NEW CAMPGROUND " + newCampground + " ADDED");
          }
     });

     // DEFAULT METHOD FOR RE-DIRECT IS GET
     res.redirect("/campgrounds");
});


// SHOW - SHOW MORE INFORMATION REGARDING A PARTICULAR CAMPGROUND
router.get("/:id", function(req, res) {

     // FIND THE CAMPGROUND WITH PROVIDED ID
     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
          if (err) {
               console.log("ERROR: " + err);
          }
          else {

               console.log("Found Campground 1:" + foundCampground);

               // RENDER THE SHOW PAGE FOR CAMPGROUND
               res.render("campgrounds/show", { campground: foundCampground });
          }
     });

});


/***************** ROUTES FOR EDITING AND DELETING CAMPGROUNDS *******/

/****** EDIT CAMPGROUND **********/
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
     Campground.findById(req.params.id, function(err, foundCampground) {
          if (err) {
               console.log("ERROR" + err);
               res.redirect("/campgrounds");
          }
          else {
               res.render("campgrounds/edit", { campground: foundCampground });
          }
     });
});

/********* SAVE CHANGES OF EDIT ********/
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {

     if (req.isAuthenticated()) {
          /* FORMAT - findByIdAndUpdate(ID,OBJECT TO SAVE, CALLBACK) */
          // FIND BY ID AND UPDATE
          Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
               if (err) {
                    res.redirect("/campgrounds");
               }
               else {
                    res.redirect("/campgrounds/" + req.params.id);
               }
          });
     }
     else {
          console.log("YOU ARE NOT ALLOWED TO EDIT CAMPGROUND");
     }
});


//   DELETE CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
     Campground.findByIdAndRemove(req.params.id, function(err) {

          // IF ERROR ENCOUNTERED IN REMOVING
          if (err) {
               console.log("ERROR" + err);
               res.redirect("/campgrounds");
          }
          else {
               res.redirect("/campgrounds");
          }

     });
});


// MODULE EXPORTS
module.exports = router;
