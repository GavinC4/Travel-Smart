<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>CRAZY TRAIN!!! ALL ABOARD!!!</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <link rel="stylesheet" href="assets/css/reset.css">
    <link rel="stylesheet" href="assets/css/styles.css">
    <!-- Latest compiled and minified JavaScript -->

</head>

<body>

    <div class="container-fluid">

        <div class="jumbotron">
            <h1 align="center" class="panel-heading">TRAIN IS HERE!!</h1>

        </div>

        <div class="panel-title text-center">
            <h2>TRAIN COMING: ALL ABOARD!!!</h2>
        </div>

        <div class="panel-body">
            <table class="table">
                <thead>
                    <th>crazyTrainName</th>
                    <th>finalStop</th>
                    <th>frequency(min)</th>
                    <th>nextDeparture</th>
                    <th>minutesAway</th>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <div class="panel-title text-center">
                <h3>addTrain</h3>
            </div>
        </div>
        <div class="panel-body">
            <form>
                <label>TrainName</label>
                <input type="text" placeholder="enterTrainName" name="name" class="form-control" aria-label="name" id="trainName">
                <br>
                <label>finalStop</label>
                <input type="text" placeholder="Enter your final stop" name="finalStop" class="form-control" aria-label="email" id="destination">
                <br>
                <label>Train Time Time (HH:mm - military time)</label>
                <input type="text" placeholder="The train will arrive: " name="trainTime" class="form-control" aria-label="Phone Number" id="startTime">
                <br>
                <label>Frequency</label>
                <input type="text" placeholder="Train arrives every" name="frequencyOfTravel" class="form-control" aria-label="bleh" id="frequency">

                <br>
                <button type="button" class="btn btn-info" id="submitTrain">Submit</button>

            </form>
        </div>


    </div>
    <!--  java script -->

    <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>

    <script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
    <script type="text/javascript" src="https://momentjs.com/downloads/moment.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script type="text/javascript" src="assets/js/app.js"></script>

</body>

</html>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Train Schedule</title>



  <meta name="google-signin-client_id" content="167602757568-k6027cugtilquc0nh7oal29icsbs44ov.apps.googleusercontent.com">
  <meta name="google-signin-cookiepolicy" content="single_host_origin">
  <meta name="google-signin-scope" content="profile email">
  <script src="https://apis.google.com/js/platform.js" async defer></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="assets/css/style.css">

</head>
<body>

<!-- 
  <div class="container">
    <div class="jumbotron text-center">
      
        <h1>Schedule That Train <br/><small class="current-time"></small></h1>
        
        <button class="text-center btn btn-lg signIn">Sign In With Google To See Schedule</button>
        
      
    </div>

   
    </div>
  </div>
<script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>
<script src="https://code.jquery.com/jquery-3.1.1.js"></script>
<script type="text/javascript" src="assets/js/script.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>
</body>
</html>
 -->