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
                comment.save();
                destination.comments.push(comment);
                destination.save(function(err, post){
                    if(err){
                        console.log(err);
                        console.log("There was a problem adding the comment to the database!");
                    } else {
                        res.render("destinations/show", {location:destination});
                    }
                });
            });
        };
    });
    
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", function(req, res){
    var comment_id = req.params.comment_id;
    var destination_id = req.params.id;
    Destination.findById(destination_id, function(err, foundDestination){
        if(err){
            console.log("Something went wrong. Could not find the destination");
            console.log(err);
        } else {
            Comment.findById(comment_id, function(err, foundComment){
                if(err){
                    console.log("Something went wrong. Could not find comment!");
                } else {
                    res.render("comments/edit", {comment:foundComment, destination: foundDestination});
                }
            })
        }
    })
});

//COMMENTS EDIT COMMENT ROUTE
router.put("/:comment_id", function(req, res){
    var new_comment= req.body.comment;
    var comment_id = req.params.comment_id;
    Comment.findByIdAndUpdate(comment_id,new_comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/destinations/" +req.params.id);
        }
    })
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;