var express = require('express');
var router = express.Router({mergeParams:true});
var Destination = require('../models/destination');
var Comment = require('../models/comment');

//===COMMENTS ROUTE (NEW)
router.get("/new", isLoggedIn, function(req, res){
    var id = req.params.id;
    Destination.findById(id, function(err, destination){
        if(err){
            console.log("Something went wrong!");
            console.log(err)
        } else {
            res.render("comments/new", {destination: destination})
        };
    });
});

//===COMMENTS ROUTE (CREATE)
router.post("/", isLoggedIn, function(req, res){
    //find the destination
    Destination.findById(req.params.id).populate("comments").exec(function(err, destination){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                destination.comments.push(comment);
                destination.save(function(err, post){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(comment)
                        res.render("destinations/show", {location:destination});
                    }
                });
            });
        };
    });
    
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;