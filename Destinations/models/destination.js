var mongoose = require('mongoose');
var destinationScheme = new mongoose.Schema({
    name: String, 
    image: String,
    description: String
 });

var Destination = mongoose.model("Destination", destinationScheme);
module.exports = Destination;