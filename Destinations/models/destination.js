var mongoose = require('mongoose');
var destinationSchema = new mongoose.Schema({
    name: String, 
    image: String,
    description: String,
    author: {
       id : {
         type: mongoose.Schema.Types.ObjectId,
         ref : "User"
       },
       username: String
    },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
 });

var Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;