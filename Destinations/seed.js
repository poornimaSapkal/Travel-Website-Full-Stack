var mongoose = require('mongoose');
var Destination = require('./models/destination');
var Comment = require('./models/comment')
var data = [
   {
    name : "Venice",
    image : "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    description : "Venice is located in the North East of Italy, in the middle of the Venetian Lagoon at the end of the Adriatic Sea. Venice is entirely surrounded by salt water and run through by canals."
   },
   {
    name : "Santorini",
    image : "https://images.unsplash.com/photo-1539288541332-0efaa4749f34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    description : "Located in the heart of the vast Aegean sea, Santorini boasts a unique landscape! The famous Santorini caldera, amazing red and black volcanic beaches, and, of course, volcano's crater in Nea Kameni, all remind the origins of the island, which was shaped by volcanic eruptions. "
   },
   {
    name : "Turkey",
    image : "https://images.unsplash.com/photo-1510253687831-0f982d7862fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80",
    description : "Turkey is often referred to as the world’s largest open air museum. For centuries, the Anatolia Peninsula has welcomed dozens of cultures, but the Romans and the Ottomans left the most lasting footprint. The country can be described as a nation of contrasts, boasting a natural, historical, and contemporary attractions. "
   }

]
function seedDB(){
    //remove all the destinations
    Destination.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("All destinations removed!");
            // data.forEach(function(seed){
            //     // Destination.create(seed, function(err, destination){
            //     //     if(err){
            //     //         console.log(err);
            //     //     } else {
            //     //         console.log("Added a destination");
            //     //         // // create a comment on each campground 
            //     //         // Comment.create({
            //     //         //     text: "This place is amazing!",
            //     //         //     author: "Homer"
            //     //         // }, function(err, comment){
            //     //         //     if(err){
            //     //         //         console.log(err)
            //     //         //     } else {
            //     //         //         destination.comments.push(comment);
            //     //         //         destination.save();
            //     //         //         console.log("Created new comment!");
            //     //         //     }
                           
            //     //         // });
            //     //     }
            //     // })
            // });
        }
    });

    //add a few campgrounds 
    
}

module.exports = seedDB;
