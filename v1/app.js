var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
        {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"} 
        ]
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}; 
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!");
});
