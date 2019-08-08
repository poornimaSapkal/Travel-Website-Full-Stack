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
            console.log(err);
            return res.redirect("/register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("destinations");
        });
    });
});

//EXISTING USER LOG IN

router.get("/login", function(req, res){
    res.render("login");
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
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
module.exports = router;