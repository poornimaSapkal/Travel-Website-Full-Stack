var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    Destination = require('./models/destination');
    seedDB = require('./seed')
mongoose.connect("mongodb://localhost/destinations", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

seedDB();

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
            res.render("index", {destinations : destinations});
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
    res.render("new");
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
            res.render("show", {location:location})
        }
    });
    
});

//===SETUP THE SERVER 
app.listen("3000", function(){
    console.log("The Server is up and running!");
});