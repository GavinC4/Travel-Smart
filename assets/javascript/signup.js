// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDpNKmsnpL-vCHRFcrZjMfvqW9vG6Ilyjc",
//     authDomain: "travel-smart-928a0.firebaseapp.com",
//     databaseURL: "https://travel-smart-928a0.firebaseio.com",
//     projectId: "travel-smart-928a0",
//     storageBucket: "",
//     messagingSenderId: "244047018856"
// };
// firebase.initializeApp(config);

var config = {

    apiKey: "AIzaSyD6f-EgnKwmX6Ff31ti0ObrYiCwAb1TNrI",
    authDomain: "my-firebase-project-d7eb2.firebaseapp.com",
    databaseURL: "https://my-firebase-project-d7eb2.firebaseio.com",
    projectId: "my-firebase-project-d7eb2",
    storageBucket: "my-firebase-project-d7eb2.appspot.com",
    messagingSenderId: "368788756012",

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

// Load the SDK asynchronously
(function(thisdocument, scriptelement, id) {
var js, fjs = thisdocument.getElementsByTagName(scriptelement)[0];
if (thisdocument.getElementById(id)) return;
js = thisdocument.createElement(scriptelement); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js"; //you can use 
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
window.fbAsyncInit = function() {
FB.init({
appId      : '1234772446668082', //Your APP ID
cookie     : true,  // enable cookies to allow the server to access 
// the session
xfbml      : true,  // parse social plugins on this page
version    : 'v2.1' // use version 2.1
});
// These three cases are handled in the callback function.
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
};
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
if (response.status === 'connected') {
// Logged into your app and Facebook.
_i();
} else if (response.status === 'not_authorized') {
// The person is logged into Facebook, but not your app.
document.getElementById('status').innerHTML = 'Please log ' +
'into this app.';
}
}  
function _login() {
FB.login(function(response) {
// handle the response
if(response.status==='connected') {
_i();
}
}, {scope: 'public_profile,email'});
}
function _i(){
FB.api('/me', function(response) {
document.getElementById("inputFname").value = response.first_name;
document.getElementById("inputLname").value = response.last_name;
document.getElementById("inputUname").value = response.user_name;
document.getElementById("inputEmail").value = response.email;
});
}
// Capture Button Click
$("#add-user").on("click", function(event) {

// prevent page from refreshing when form tries to submit itself
event.preventDefault();
// Capture user inputs and store them into variables
var firstName = $("#inputFname").val().trim();
var lastName = $("#inputLname").val().trim();
var userName = $("#username-input").val().trim();
var email = $("#inputEmail").val().trim();
var password = $("#password-input").val().trim();

// Console log each of the user inputs to confirm we are receiving them
console.log(firstName, lastName, userName, email, password);
// push user info to database
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
// for sign in authentication
firebase.auth().signInWithCustomToken(token).catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
// ...
});
firebase.auth().signOut().then(function() {
// Sign-out successful.
}).catch(function(error) {
// An error happened.
});
});