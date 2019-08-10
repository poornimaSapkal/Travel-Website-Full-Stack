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
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var description = req.body.description;
    var destination = {name: name , image: image, description: description, author: author};
    console.log(req.user);
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
    console.log(destination);
    res.redirect("destinations");
});


//===NEW
router.get("/new", isLoggedIn, function(req, res){
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

//EDIT DESTINATIONS ROUTE 
router.get("/:id/edit", checkDestinationOwnership ,function(req, res){
    var id = req.params.id;
    Destination.findById(id, function(err, destination){
        res.render("../views/destinations/edit", {destination:destination});
    }); 
});

//UPDATE DESTINATIONS ROUTE 
router.put("/:id", function(req, res){
    var data = req.body.destination;
    var id = req.params.id;
    Destination.findByIdAndUpdate(id, data, function(err, newDestination){
        if(err){
            res.redirect("/");
        } else {
            res.redirect("/destinations/" +id)
        }
    })
    
});

//DESTROY ROUTE
router.delete("/:id", function(req, res){
    var id = req.params.id;
    Destination.findByIdAndDelete(id, function(err){
        if(err){
            res.redirect("/destinations");
        } else {
            res.redirect("/destinations");
        }
    });
});


//middleware  
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

function checkDestinationOwnership(req, res, next){
    var id = req.params.id;
    //is the user logged in 
    if(req.isAuthenticated()){
        Destination.findById(id, function(err, destination){
            if(err){
                res.redirect("back");
            } else {
                //does the user own the destination
                if(destination.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back")
                }
                
            }
        });
    } else {
        res.redirect("back")
    }
}

module.exports = router;