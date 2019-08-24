var express = require('express');
var router = express.Router({mergeParams:true});
var passport = require('passport');
var User = require('../models/user');
//===SETUP THE ROUTES

router.get("/", function(req, res){
    res.render("landing");
});

// AUTHENTICATION ROUTES

//===NEW USER SIGN UP
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var name = req.body.username;
    User.register(new User({username: name}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to Destinations, "+ user.username);
            res.redirect("/destinations");
        });
    });
});

//EXISTING USER LOG IN

router.get("/login", function(req, res){
    res.render("login",{message:req.flash("error")});
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/destinations",
        failureRedirect: "/login"
    }), function(req, res){
});

// USER LOGOUT 

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;