// Initialize Firebase
var config = {
    apiKey: "AIzaSyDpNKmsnpL-vCHRFcrZjMfvqW9vG6Ilyjc",
    authDomain: "travel-smart-928a0.firebaseapp.com",
    databaseURL: "https://travel-smart-928a0.firebaseio.com",
    projectId: "travel-smart-928a0",
    storageBucket: "",
    messagingSenderId: "244047018856"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database()

// Capture Button Click
$("#add-user").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var firstName = $("#firstname-input").val().trim();
    var lastName = $("#lastname-input").val().trim();
    var userName = $("#username-input").val().trim();
    var email = $("#email-input").val().trim();
    var password = $("#password-input").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    console.log(firstName, lastName, userName, email, password);

    if ((firstName == "") || (lastName == "") || (userName == "") || (email == "") || (password == "")) {

        setError();

    } else {
        database.ref().push({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
            created: firebase.database.ServerValue.TIMESTAMP,
            modified: firebase.database.ServerValue.TIMESTAMP

        });
    }

    $('input').val("");

});