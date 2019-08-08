var express = require('express');
var router = express.Router({mergeParams:true});

var Destination = require('../models/destination');
var User = require('../models/user')
//===INDEX
router.get("/", function(req, res){
    Destination.find({}, function(err, destinations){
        if(err){
            console.log("There was a problem fetching the data from the database");
            console.log(err);
        } else {
            res.render("destinations/index", {destinations : destinations});
        }
    });  
});

//==CREATE
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var destination = {name: name , image: image, description: description};
    //adding it to the database
    Destination.create(destination, function(err, des){
        if(err){
            console.log("An error occurred");
        }
        else {
            console.log("Added a destination");
        }
    })
    //destinations.push(destination);
    res.redirect("destinations");
});


//===NEW
router.get("/new", function(req, res){
    res.render("destinations/new");
});

//===SHOW
router.get("/:id", function(req, res){
    //console.log(req.params.id)
    //Find the campground by that id
    //Send that information to the show page
    var id = req.params.id;
    Destination.findById(id).populate("comments").exec(function(err, location){
        if(err){
            console.log("There was an error!");
        } else {
            res.render("destinations/show", {location:location})
        }
    });
    
});

module.exports = router;