$(document).ready(function() {
//displays modal
$('#myModal').modal('show');

});  
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
        if (!citysnap.child("srchCounter").exists()) {
            var srchCount = 0;
            cityRef.child("srchCounter").set(srchCount);
        }
    });
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(".cityFlight").hide();
// $(".form-group").hide();
$(".container-fluid").hide(); // Mark addded conatiner-fluid hide to stop text runnoff
 
$(".where").autocomplete({
  source: cityOptions
});

//             $.ajax({
//             method: "GET",
//             url: "amadeus.js",
//             dataType: "script"
// });

            // $(".container-fluid").hide(); // Mark addded conatiner-fluid hide to stop text runnoff

            // $(".where").autocomplete({
            //     source: cityOptions
            // });

            var int; //changed the interval variable scope to global  -- wenfang
            var srchResPage = false; //a flag for checking if current 'page' is search page or result page

            // on click function
            $(".submit").on("click", function(event) {

                event.preventDefault();
                $(".container-fluid").show(); // Mark added container-fluid show rule on submit


                imageArray = []; //reset imageArray
                srchResPage = true;

                // take value from input name
                var cityInput = $(".where").val().trim(); //To agree with the database, city input from the 'where' search box has the form 'New York City, United States' -- wenfang
                var arr = cityInput.split(",");
                cityName = arr[0];
                console.log("cityName var is: " + cityName);

                // hides the search box
                $(".wrap").hide();

                // Getty image apikey
                var gettyApiKey = 'd6e3snbs3ch2qvk8wctwnjmc';
                // Getty image ajax call
                $.ajax({
                    type: 'GET',
                    url: "https://api.gettyimages.com/v3/search/images/creative?fields=display_set&phrase=" + cityName,
                    beforeSend: function(request) {
                        request.setRequestHeader("Api-Key", gettyApiKey);
                    }
                }).done(function(data) {

                    console.log("Ran ajax success");
                    $(".panel-title").html("<strong>" + cityName + "</strong>");
                    // loop through images on Getty images
                    for (var i = 0; i < data.images.length; i++) {
                        // push images into an array - this would be used if we wanted to loop a certain number of images instead all of them
                        imageArray.push(data.images[i].display_sizes[0].uri);
                        // $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
                    }
                    // console.log(imageArray);
                    var i = 0;
                    $(".cityImage").show();
                    changeImg(); //call for the first time 

                    // set loop for X seconds
                    int = self.setInterval(changeImg, 1000 * 5);
                    //a back-to-search button added
                    var backBtn = $("<button class='submit navbutton' id='back'>").text("Back to Search");
                    $(".cityImage").append(backBtn);

                    // displays images in DOM and increments i
                    function changeImg() {
                        // $(".cityImage").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
                        // $(".cityImage").html("<img src='" + imageArray[i] + "'/>");
                        $(".cityImage img").attr("src", imageArray[i]);
                        i++;
                        if (i === imageArray.length) //need to reset i to 0  -- wenfang
                            i = 0;
                    }
                });

                // World Weather Online apikey
                $(".cityWeather").show();
                $("#localTimeWeather").empty();
                var wwoApiKey = 'ac4c2f19b48740fd9ce201023171209';
                var weatherURL = "https://api.worldweatheronline.com/premium/v1/weather.ashx?q=" + cityName + "&format=json&key=" + wwoApiKey;
                var tzURL = "https://api.worldweatheronline.com/premium/v1/tz.ashx?q=" + cityName + "&format=json&key=" + wwoApiKey;
                $.ajax({
                    url: tzURL,
                    method: "GET"
                }).done(function(localtime) {
                    $("#localTimeWeather").prepend("Local Time:" + "\xa0\xa0\xa0\xa0" + localtime.data.time_zone[0].localtime + "<br/>");
                });

                $.ajax({
                    url: weatherURL,
                    method: "GET"
                }).done(function(localweather) {
                    $("#localTimeWeather").append("Current Weather: " + localweather.data.current_condition[0].weatherDesc[0].value +
                        "\xa0\xa0\xa0\xa0\xa0\xa0" + "Temperature (F): " + localweather.data.current_condition[0].temp_F +
                        "\xa0\xa0\xa0\xa0\xa0\xa0" + "Wind Speed (Mph): " + localweather.data.current_condition[0].windspeedMiles +
                        "\xa0\xa0\xa0\xa0\xa0\xa0" + "Humidity: " + localweather.data.current_condition[0].humidity);
                    var minTemp = "<tr><td>Avg Min Temp(F)<td>";
                    var maxTemp = "<tr><td>Abs Max Temp(F)<td>";
                    var rainFall = "<tr><td>Avg Daily Rainfall(in)<td>";
                    for (var i = 0; i < 12; i++) {
                        if (i === 11) {
                            minTemp += localweather.data.ClimateAverages[0].month[i].avgMinTemp_F + "</td></tr>";
                            maxTemp += localweather.data.ClimateAverages[0].month[i].absMaxTemp_F + "</td></tr>";
                            rainFall += localweather.data.ClimateAverages[0].month[i].avgDailyRainfall + "</td></tr>";
                        } else {
                            minTemp += localweather.data.ClimateAverages[0].month[i].avgMinTemp_F + "</td><td>";
                            maxTemp += localweather.data.ClimateAverages[0].month[i].absMaxTemp_F + "</td><td>";
                            rainFall += localweather.data.ClimateAverages[0].month[i].avgDailyRainfall + "</td><td>";
                        }
                    }
                    $("#weather-table > tbody").append(minTemp);
                    $("#weather-table > tbody").append(maxTemp);
                    $("#weather-table > tbody").append(rainFall);
                });

                /* Added codes for importing things-to-do contents to the cityToDo div -- wenfang */
                $(".popularSrches").empty();
                $(".cityToDo h2").text("Things To Do in " + cityName);
                $(".cityToDo").append("<hr>");
                database.ref("Posts").once("value", function(snapshot) {
                    if (snapshot.child(cityInput).exists()) {
                        var childRef = snapshot.ref.child(cityInput);
                        childRef.once("value", function(childsnap) {
                            childsnap.forEach(function(snap) {
                                var key = snap.key;
                                if (key.includes("Paragraph")) {
                                    var paragraphDiv = $("<div>").html("<p class='lead'>" + snap.val() + "</p>");
                                    $(".cityToDo").append(paragraphDiv);
                                } else if (key === "srchCounter") { //increment the city's search count
                                    var cnt = snap.val() + 1;
                                    childRef.child("srchCounter").set(cnt);
                                }
                            });
                        });
                    }
                }, function(errorObject) {
                    console.log("Errors handled: " + errorObject.code);
                });

                //a checkout-flight button added
                var flightBtn = $("<button class='submit navbutton' id='chkflight'>").text("Plan Your Trip");
                $(".cityToDo").append("<br><br>").append(flightBtn);

            }); /*added closing semicolons --- wenfang */

            //we need a button to go back to search
            $(".cityImage").on("click", "#back", function() {
                location.reload();
            });

            $(".cityToDo").on("click", "#chkflight", function () {
                clearInterval(int);
                location.href = "beta.html";
            });

            //fetch most-searched places to the front page
            var aRef = database.ref("Posts").orderByChild("srchCounter").limitToLast(3);
            aRef.on("child_added", function(snapshot) {
                var destHead = $("<h4>").text(snapshot.key);
                var destDescription = $("<p>").text(snapshot.val()["Paragraph 1"]);
                if (!srchResPage)
                    $(".popularSrches").append(destHead, destDescription);
            });
