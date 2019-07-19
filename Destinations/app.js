var express = require('express'), 
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/destinations", {useNewUrlParser: true});

 var destinationScheme = new mongoose.Schema({
    name: String, 
    image: String
 });

 var Destination = mongoose.model("Destination", destinationScheme);

//  Destination.create({
//     name: 'Venice', 
//     image:'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
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
            console.log("All the destinations!");
            console.log(destinations);
            res.render("destinations", {destinations : destinations});
        }
    });  
});

app.post("/destinations", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var destination = {name: name , image: image};
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
    res.redirect("/destinations");
});

app.get("/destinations/new", function(req, res){
    res.render("new");
});


//===SETUP THE SERVER 
app.listen("3000", function(){
    console.log("The Server is up and running!");
});