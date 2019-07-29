var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    Destination = require('./models/destination')
mongoose.connect("mongodb://localhost/destinations", {useNewUrlParser: true});


//  Destination.create({
//     name: 'Venice', 
//     image:'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
//     description: 'Venice is located in the North East of Italy, in the middle of the Venetian Lagoon at the end of the Adriatic Sea. Venice is entirely surrounded by salt water and run through by canals.'
// }, function(err, destination){
//      if (err){
//          console.log("Something went wrong");
//          console.log(err);
//      } else {
//          console.log("Added a destination to the database!");
//          console.log(destination);
//      }
//  });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//===SETUP THE ROUTES

app.get("/", function(req, res){
    res.render("landing");
});

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

app.get("/destinations/new", function(req, res){
    res.render("new");
});

app.get("/destinations/:id", function(req, res){
    //console.log(req.params.id)
    //Find the campground by that id
    //Send that information to the show page
    var id = req.params.id;
    Destination.findById(id, function(err, location){
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