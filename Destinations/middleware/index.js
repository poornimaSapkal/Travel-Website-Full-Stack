// all the middleware goes here 
var Destination = require('../models/destination');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkDestinationOwnership = function(req, res, next){
    var id = req.params.id;
    //is the user logged in 
    if(req.isAuthenticated()){
        Destination.findById(id, function(err, destination){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                //does the user own the destination
                if(destination.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorized to do that");
                    res.redirect("back")
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    var id = req.params.comment_id;
    //is the user logged in 
    if(req.isAuthenticated()){
        Comment.findById(id, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                //does the user own the comment
                if(comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorized to do that");
                    res.redirect("back")
                }          
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;