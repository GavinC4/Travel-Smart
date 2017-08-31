$(document).on("ready", function() {

     // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUxi2hoIiXDN1PobUQKZRxJWVFZ0L_NQ8",
    authDomain: "trainschedulervb2b.firebaseapp.com",
    databaseURL: "https://trainschedulervb2b.firebaseio.com",
    projectId: "trainschedulervb2b",
    storageBucket: "trainschedulervb2b.appspot.com",
    messagingSenderId: "131497746801"
  };
  firebase.initializeApp(config);

    var trainData = firebase.database();

    $("#submitTrain").on("click", function() {

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = moment($("#startTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            //will firstTrain throw it off?
            firstTrain: startTime,
            frequency: frequency,
        }

        trainData.ref().push(newTrain);

        console.log(newTrain.name)
        console.log(newTrain.destination)
        console.log(startTime)
        console.log(newTrain.frequency)

        $("#trainName").empty();
        $("#destination").empty();
        $("#startTime").empty();
        $("#frequency").empty();

        return false;


    });

    trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainNameAppend = childSnapshot.val().name
        var destinationAppend = childSnapshot.val().destination
        var frequencyAppend = childSnapshot.val().frequency
        var firstTrainAppend = childSnapshot.val().firstTrain

        var timeDifference = moment().diff(moment.unix(firstTrainAppend), "minutes");

        var remainingTime = moment().diff(moment.unix(firstTrainAppend), "minutes") % frequencyAppend;
        var timeMinutes = frequencyAppend - remainingTime;


        var arrivalTime = moment().add(timeMinutes, "m").format("hh:mm A");
        console.log(arrivalTime)
        console.log(timeMinutes)

        console.log(moment().format("hh:mm A"))
        console.log(arrivalTime);
        console.log(moment().format("X"))

        $("#tableBody").append("<tr><td>" + trainNameAppend + "</td><td>" + destinationAppend + "</td><td>" + firstTrainAppend +  "</td><td>" + arrivalTime + "</td><td>" + timeMinutes + "</td></tr>")

    });

});
