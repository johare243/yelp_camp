var  mongoose = require("mongoose");
var  Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
        name: "Cloud's Rest",
        image: "://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jp://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
        description: "some stuff about this campgorund"

  },
  {
        name: "Desert Mesa",
        image: "://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
        description: "some stuff about this campgorund"

  },
  {
        name: "Canyon Floor ",
        image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",
        description: "some stuff about this campgorund"

  }
]

function seedDB(){
Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
      console.log("removed campgrounds!");
	data.forEach(function(seed){
          Campground.create(seed, function(err, campground){
                  if(err){
                          cosole.log(err);
                  } else {
                          console.log("added a Campground");
                          Comment.create(

                               {
                                 text: "This place is great, but I wish it had internet!",
                                 author: "Homer"
                               }, function(err, comment){
                                       if(err){
                                          console.log(err);
                                       } else {
                                          campground.comments.push(comment);
                                          campground.save();
                                          console.log("Created new comment");
                                       }
                               });

                  }
        });
     });
  });
}

module.exports = seedDB;
