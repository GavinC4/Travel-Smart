var cityName = "";
var imageArray = [];

    // on click function
    $(".submit").on("click" , function(event) {
        event.preventDefault();

        // take value from input name
        cityName = $("#where").val().trim();

        console.log("where: " + cityName);

        $(".login").hide();

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

            // $(".box").html("<h2>" + cityName + "</h2>");

            // loop through the first 10 images on Getty images
            for(var i = 0; i < 10; i++) {
                // push 10 imges into array
                // imageArray.push(data.images[i].display_sizes[0].uri);

                $(".box").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
            }

            console.log(imageArray);
            var i = 0;
            // set loop for X seconds
            var int = self.setInterval(changeImg, 1000 * 5);
            // displays images in DOM and increments i
            function changeImg() {
                $(".box").html("<img src='" + data.images[i].display_sizes[0].uri + "'/>");
                i++;
            }
        })
    })
