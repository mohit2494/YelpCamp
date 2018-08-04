/* 
     USING {} INSIDE THE REMOVE / FIND 
     IS ESSENTIALLY THE SAME AS 
     "*" IN SQL PARADIGM
*/

// REQUIRE VARIABLES
var
     mongoose = require("mongoose"),
     Campground = require("./models/campground"),
     Comment = require("./models/comment");


// MAKING DUMMY DATA AS PER CAMPGROUND MODEL
var data = [
     {
          name: "Cloud's Rest",
          image: "https://images.unsplash.com/photo-1486082570281-d942af5c39b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d06322d7df8c19c1e648c8c3a101d2d&auto=format&fit=crop&w=1051&q=80",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!"

     },
     {
          name: "The Dungeon",
          image: "https://images.unsplash.com/photo-1432817495152-77aa949fb1e2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a6f210acc36ab5742aa863e7a2240a2a&auto=format&fit=crop&w=1049&q=80",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!"

     },
     {
          name: "Himalayas",
          image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1050&q=80",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!"
     }
];


/*
     NOTE:
     THERE IS NO GUARANTEE WHETHER THE 
     1. REMOVE CODE
     2. CREATE CODE 
     WILL RUN FIRST.
     
     THUS,
     WE USE CALLBACKS! 
     
     ADDING THE CREATE FUNCTION IN THE CALLBACK OF 
     REMOVE FUNCTION
*/
function seedDB() {

     // CLEAR CAMPGROUNDS
     Campground.remove({}, function(err) {

          if (err) {
               console.log("ERROR DELETING CAMPGROUND DATA..");
               console.log(err);
          }
          else {
               console.log("DELETED CAMPGROUNDS DATA .. ");
          }
          
          console.log("STARTING ADDING DATA .. ");
          // CREATING DUMMY CAMPGROUNDS DATA
          data.forEach(function(seed) {
               Campground.create(seed, function(err, campground) {
                    if (err)
                         console.log(err);
                    else {
                         console.log("ADDED A CAMPGROUND -> " + seed.name);
          
                         // CREATE A COMMENT FOR EACH POST
                         Comment.create({
                              text: "This place is great, but I wish there was internet!",
                              author: "Homer"
                         }, function(err, comment) {
                              if (err)
                                   console.log("ERROR: " + err);
                              else {
                                   campground.comments.push(comment);
                                   campground.save();
                                   console.log("Added a Comment in Campground: " + comment);
                              }
                         });
                    }
               })
          });
     });
}

// EXPORTING SEEDB() FUNCTION FOR APP.JS
module.exports = seedDB;
