var express     = require("express"),
    mongoose    = require("mongoose"),
    request     = require("request"),
    Comment     = require("./models/comment"),
    seedDB     = require("./seeds"),
    passport     = require("passport"),
    LocalStrategy     = require("passport-local"),
    bodyParser  = require("body-parser"),
    Campground  = require("./models/campground"),
    User  = require("./models/user"),
    app         = express();

seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


// PASSPORT CONFIG
app.use(require("express-session", ({
        secret: "This is the secret...",
        resave: false,
        saveUninitialized: false
})));

app.get("/", function(req, res) {
    res.render("landing");
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allcampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
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
    res.render("campgrounds/new");
});

//SHOW -shows more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find campgraound with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//  ++++++++++++++++++++++++++++++
//  COMMENTS
//  ++++++++++++++++++++++++++++++
app.get("/campgrounds/:id/comments/new", function(req, res) {
        Campground.findById(req.params.id, function(err, campground) {
                if (err) {
                        console.error(err);
                } else {
                        res.render("comments/new", {campground: campground});
                }
        });
});

app.post("/campgrounds/:id/comments", function(req, res) {
        Campground.findById(req.params.id, function(err, campground) {
                if (err) {
                        console.log(err);
                        res.redirect("/campgrounds");
                } else {
                        Comment.create(req.body.comment, function(err, comment) {
                                if (err) {
                                        console.log(err);
                                } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        res.redirect("/campgrounds/" + campground._id);
                                }
                        });
                }
       });
});

// AUTH ROUTES
app.get('/register', function (req,res) {
        res.render('register');
});

app.post('/register', function (req, res) {
        var newUser = new User({username: req.body.username});
        User.register(newUser(newUser, req.body.password, function (err, user) {
                if (err) {
                        console.log(err);
                        return res.render("register");
                } else {
                       passport.authenticate("local") (req, res, function() {
                               res.redirect("/campgrounds");
                       });
                }
        }));
});

app.get('/login', function(req, res) {
        res.render("/login");
});

app.post('/login', passport.authenticate("local", 
                        {
                         successRedirect: "/campgrounds", 
                         failureRedirect: "/login"
                        }), function(req, res) {
                              res.redirect('/login');
});

var  port = 3000;
app.listen(port, function () {
	console.log("Server started on port " + port);
});
//app.listen(process.env.PORT, process.env.IP, function() {
    //console.log("The YelpCamp Server has started!");
//});
