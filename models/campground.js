// IMPORTING MONGOOSE PACKAGE
var mongoose = require('mongoose');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
     name: String,
     price: String,
     image: String,
     description: String,
     author: {
          id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
          },
          username: String
     },
     comments: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "comment"
          }
     ]
});

// MAKING A MODEL USING THE ABOVE SCHEMA
var Campground = mongoose.model("Campground", campgroundSchema);

// EXPORT MODEL
module.exports = Campground;
