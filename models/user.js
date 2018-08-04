// MONGOOSE OBJECT
var mongoose = require("mongoose");

// PASSPORT LOCAL MONGOOSE 
var passportLocalMongoose = require("passport-local-mongoose");

// USER SCHEMA
var UserSchema = new mongoose.Schema({

     username: String,
     password: String
});

// USER SCHEMA PLUGIN - ADDS METHODS TO THE ABOVE DEFINED USER
UserSchema.plugin(passportLocalMongoose);

// MAKE USER SCHEMA MODEL
var User = mongoose.model("user", UserSchema);

// EXPORT USER OBJECT
module.exports = User;
