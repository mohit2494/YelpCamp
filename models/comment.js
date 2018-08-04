// REQUIRE MONGOOSE
var
     mongoose = require("mongoose");

// COMMENTS SCHEMA
var
     commentSchema = mongoose.Schema({
          text: String,
          author: {
               id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User" // LIKE A FOREIGN KEY TO USER
               },
               username: String
          }
     });

// MAKING A MODEL OUT OF A SCHEMA
var
     exportComment = mongoose.model("comment", commentSchema);

// EXPORTING MODEL VARIABLE
module.exports = exportComment;
