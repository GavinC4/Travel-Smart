 /*added database contents --- wenfang */
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD6f-EgnKwmX6Ff31ti0ObrYiCwAb1TNrI",
    authDomain: "my-firebase-project-d7eb2.firebaseapp.com",
    databaseURL: "https://my-firebase-project-d7eb2.firebaseio.com",
    projectId: "my-firebase-project-d7eb2",
    storageBucket: "my-firebase-project-d7eb2.appspot.com",
    messagingSenderId: "368788756012"
 };
 firebase.initializeApp(config);

 var database = firebase.database();

var cityName = "";
var imageArray = [];

// added auto-complete to the 'where' search box --- wenfang
var cityOptions = [];

database.ref("Posts").on("child_added", function(snap) {
    // console.log(snap.ref.parent.key);
    var cityString = snap.ref.key;
    // console.log(cityString);
    cityOptions.push(cityString);
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#where").autocomplete({
  source: cityOptions
});

    // on click function
    $(".submit").on("click" , function(event) {
        event.preventDefault();

        // take value from input name
        var cityInput = $("#where").val().trim();  //To agree with the database, city input from the 'where' search box has the form 'New York City, United States' -- wenfang
        var arr = cityInput.split(",");
        cityName = arr[0];
        console.log("where: " + cityName);
        // hides the search box
        $(".wrap").hide();

        // Getty image apikey
        var apiKey = 'd6e3snbs3ch2qvk8wctwnjmc';
        // Getty image ajax call
        $.ajax({
            type:'GET',
            url:"https://api.gettyimages.com/v3/search/images/creative?fields=display_set&phrase=" + cityName,
            beforeSend: function (request) {
            request.setRequestHeader("Api-Key", apiKey);
        }}).done(function(data) {

            console.log("Ran ajax success");
            $(".panel-title").html("<strong>" + cityName + "</strong>");
            // loop through images on Getty images
            for(var i = 0; i < data.images.length; i++) {
                // push images into an array - this would be used if we wanted to loop a certain number of images instead all of them
                // imageArray.push(data.images[i].display_sizes[0].uri);
                $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
            }
            console.log(imageArray);
            var i = 0;
            // set loop for X seconds
            var int = self.setInterval(changeImg, 1000 * 5);
            // displays images in DOM and increments i
            function changeImg() {
                $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
                i++;
            }
        });
        
        /* Added codes for importing things-to-do contents to the cityToDo div -- wenfang */
        $(".cityToDo h2").text("Things To Do in " + cityName);

        database.ref("Posts").on("value", function(snapshot) {
            if(snapshot.child(cityInput).exists()) {
                var childRef = snapshot.ref.child(cityInput);
                childRef.on("value", function(childsnap) {
                    childsnap.forEach(function(snap){
                        var key = snap.key;
                        if(key.includes("Paragraph")) {
                            var paragraphDiv = $("<div>").html("<p class='lead'>" + snap.val() + "</p>");
                        }
                        $(".cityToDo").append(paragraphDiv);
                    });
                });
            }
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    });   /*added closing semicolons --- wenfang */

    


