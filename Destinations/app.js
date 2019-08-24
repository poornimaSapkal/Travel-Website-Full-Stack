var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    Destination = require('./models/destination');
    Comment = require('./models/comment');
    seedDB = require('./seed'),
    passport = require('passport'),
    flash = require('connect-flash'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user')

//requiring routes
var commentRoutes = require('./routes/comments'),
    destinationRoutes = require('./routes/destinations'),
    indexRoutes = require('./routes/index')

mongoose.connect("mongodb://localhost/destinations", {useNewUrlParser: true});

//seedDB();//seeding the database 

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require('express-session')({
    secret: "Meow is the cutest cat in the world!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});

app.use(indexRoutes);
app.use("/destinations/:id/comments",commentRoutes);
app.use("/destinations",destinationRoutes);
 
//===SETUP THE SERVER 
app.listen("3000", function(){
    console.log("The Server is up and running!");
});