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
    var cityRef = snap.ref;
    var cityString = cityRef.key;
    // console.log(cityString);
    cityOptions.push(cityString);
    //added a search counter property to each city
    cityRef.once("value", function(citysnap) {
        if(!citysnap.child("srchCounter").exists()) { 
            var srchCount = 0;
            cityRef.child("srchCounter").set(srchCount);
        }
    });
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#where").autocomplete({
  source: cityOptions
});

var int;  //changed the interval variable scope to global  -- wenfang

    // on click function
    $(".submit").on("click" , function(event) {
        event.preventDefault();

        imageArray = [];  //reset imageArray

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
                imageArray.push(data.images[i].display_sizes[0].uri);
                // $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
            }
            // console.log(imageArray);
            var i = 0;
            $(".cityImage").show();
            changeImg();  //call for the first time 

            // set loop for X seconds
            int = self.setInterval(changeImg, 1000 * 5);
            //a back-to-search button added
            var backBtn = $("<button class='submit backbutton'>").text("Back to Search");
            $(".cityImage").append(backBtn);

            // displays images in DOM and increments i
            function changeImg() {
                // $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
                // $(".cityImage").html("<img src='" + imageArray[i] + "'/>");
                $(".cityImage img").attr("src", imageArray[i]);
                i++;
                if(i===imageArray.length)  //need to reset i to 0  -- wenfang
                    i=0;
            }
        });
        
        /* Added codes for importing things-to-do contents to the cityToDo div -- wenfang */
        $(".popularSrches").empty();
        $(".cityToDo h2").text("Things To Do in " + cityName);
        $(".cityToDo").append("<hr>");
        // database.ref("Posts").on("value", function(snapshot) {
        database.ref("Posts").once("value", function(snapshot) {
            if(snapshot.child(cityInput).exists()) {
                var childRef = snapshot.ref.child(cityInput);
                childRef.once("value", function(childsnap) {
                    childsnap.forEach(function(snap){
                        var key = snap.key;
                        if(key.includes("Paragraph")) {
                            var paragraphDiv = $("<div>").html("<p class='lead'>" + snap.val() + "</p>");
                            $(".cityToDo").append(paragraphDiv);
                        }
                        else if(key === "srchCounter") {  //increment the city's search count
                            var cnt = snap.val()+1;
                            childRef.child("srchCounter").set(cnt);
                        }
                    });
                });
            }
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    });   /*added closing semicolons --- wenfang */

    //we need a button to go back to search
    $(".cityImage").on("click", ".backbutton", function () {
        location.reload();
    })

    //fetch most-searched places to the front page
    var aRef = database.ref("Posts").orderByChild("srchCounter").limitToLast(3);
    aRef.on("child_added", function(snapshot) {
        var destHead = $("<h4>").text(snapshot.key);
        var destDescription = $("<p>").text(snapshot.val()["Paragraph 1"]);
        
        $(".popularSrches").append(destHead, destDescription);
    });


