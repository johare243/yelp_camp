var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    request     = require("request"),
    bodyParser  = require("body-parser"),
    app         = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEME SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create(
//        {name: "Granite Hill", 
//        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
//        description: "This is a huge granite hill, no bathrooms.  No water.  Wonderful granite!"
//            
//        },
//    function(err, campground){
//        if(err) {
//            console.log(err);
//        } else {
//            console.log("NEWLY CREATED CAMPGROUND")
//            console.log(campground);
//        }
//    });

    //var campgrounds = [
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Salmon Creek", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}, 
       // {name: "Granite Hill", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
       // {name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"} 
       // ]
app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allcampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allcampgrounds});
        }
    })
    //res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}; 
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW -shows more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find campgraound with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started!");
});
