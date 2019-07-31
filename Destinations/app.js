var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    Destination = require('./models/destination');
    Comment = require('./models/comment');
    seedDB = require('./seed'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user')

mongoose.connect("mongodb://localhost/destinations", {useNewUrlParser: true});

seedDB();



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"))

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

//===SETUP THE ROUTES

app.get("/", function(req, res){
    res.render("landing");
});

//===INDEX
app.get("/destinations", function(req, res){
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
app.post("/destinations", function(req, res){
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
app.get("/destinations/new", function(req, res){
    res.render("destinations/new");
});

//===SHOW
app.get("/destinations/:id", function(req, res){
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

//===COMMENTS ROUTE (NEW)
app.get("/destinations/:id/comments/new", function(req, res){
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
app.post("/destinations/:id/comments", function(req, res){
    //find the destination
    Destination.findById(req.params.id).populate("comments").exec(function(err, destination){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                destination.comments.push(comment);
                destination.save(function(err, post){
                    if(err){
                        console.log(err);
                    } else {
                        res.render("destinations/show", {location:destination});
                    }
                });
            });
        };
    });
    
});

// AUTHENTICATION ROUTES
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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



//===SETUP THE SERVER 
app.listen("3000", function(){
    console.log("The Server is up and running!");
});