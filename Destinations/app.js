var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


var destinations = [
    {name: 'Santorini', image: 'https://images.unsplash.com/photo-1539288541332-0efaa4749f34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'},
    {name: 'Bali', image: 'https://images.unsplash.com/photo-1557093793-e196ae071479?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    {name: 'Bora Bora', image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    {name: 'Nice', image: 'https://images.unsplash.com/photo-1551799142-93484f2d0284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80'},
    {name: 'Florence', image: 'https://images.unsplash.com/photo-1476362174823-3a23f4aa6d76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'},
    {name: 'Venice', image:'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'}
];
//===SETUP THE ROUTES

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/destinations", function(req, res){
    res.render("destinations", {destinations : destinations});
    //console.log("control is sent back here!");
    
});

app.post("/destinations", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var destination = {name: name , image: image};
    destinations.push(destination);
    res.redirect("/destinations");
});

app.get("/destinations/new", function(req, res){
    res.render("new");
});


//===SETUP THE SERVER 
app.listen("3000", function(){
    console.log("The Server is up and running!");
});