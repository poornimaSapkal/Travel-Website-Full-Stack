var express = require('express');
var router = express.Router({mergeParams:true});
var Destination = require('../models/destination');
var Comment = require('../models/comment');
var middleware = require('../middleware')

//===COMMENTS ROUTE (NEW)
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                        req.flash("success", "Successfully added comment");
                        res.render("destinations/show", {location:destination});
                    }
                });
            });
        };
    });
    
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Something went wrong");
            } else {
            res.render("comments/edit", {comment:foundComment, destination_id: req.params.id});
        }
    });
});

//COMMENTS EDIT COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    var new_comment= req.body.comment;
    var comment_id = req.params.comment_id;
    Comment.findByIdAndUpdate(comment_id,new_comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            req.flash("success", "Your changes have been saved");
            res.redirect("/destinations/" +req.params.id);
        }
    })
});

//COMMENTS DESTROY ROUTE 
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment has been deleted");
            res.redirect("/destinations/"+ req.params.id);
        };
    })
});

module.exports = router;