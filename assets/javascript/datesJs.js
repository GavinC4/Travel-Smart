$( document ).ready(function() {
// $(".flights").hide(); // Mark addded conatiner-fluid hide to stop text runnoff
// // on click function
//     $("#flights").on("click" , function(event) {
//       console.log("click")
//         $(".flights").show(); // Mark added container-fluid show rule on submit
//      });
$( function(checkIn) {
  var dateToday = new Date();
  var dates = $("#start-date").datepicker({
    defaultDate: "+2d",
    changeMonth: true,
    numberOfMonths: 1,
    minDate: dateToday,
    dateFormat: "yy-mm-dd",
    onSelect: function(selectedDate) {
        var option = this.id == "start-date" ? "minDate" : "maxDate",
        instance = $(this).data("datepicker"),
        date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
        console.log("Printing this: " + this); // found the input form
        console.log("Printing this.value: " + this.value);
        checkIn = (this.value); 
        console.log("This is the checkIn: " + checkIn); // returns object, unless reset to this.value
        departure_date = (checkIn);
        date = (departure_date);
        console.log("This is the departure_date: " + departure_date);
        console.log("This is the date: " + date);
        // console.log(minDate);
        // console.log(maxDate);
        dates.not(this).datepicker("option", option, date);
        // console.log(option.start-date);
        // console.log(option.maxDate);
        // console.log(date[1]);
        console.log("Printing dates[0].value: " + dates[0].value);
        console.log("Printing date " + date); // this consoles the full dates
        // log(checkIn);
    }
  });
}); // end of function checkIn
$( function(checkOut) {
  var dateToday = new Date();
  var dates = $("#end-date").datepicker({
    defaultDate: "+2d",
    changeMonth: true,
    numberOfMonths: 1,
    minDate: dateToday,
    dateFormat: "yy-mm-dd",
    onSelect: function(selectedDate) {
        var option = this.id == "end-date" ? "minDate" : "maxDate",
        instance = $(this).data("datepicker"),
        date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
        console.log("Printing this: " + this); // found the input form
        console.log("Printing this.value: " + this.value);
        checkOut = (this.value); 
        console.log("This is the checkOut: " + checkOut); // returns object, unless reset to this.value
        return_date = (checkOut);
        console.log("This is the return_date: " + return_date);
        // console.log(minDate);
        // console.log(maxDate);
        dates.not(this).datepicker("option", option, date);
        // console.log(option.start-date);
        // console.log(option.maxDate);
        // console.log(date[1]);
        console.log("Printing dates[0].value: " + dates[0].value);
        console.log("Printing date " + date); // this consoles the full dates
        // log(checkOut);
    }
  });
}); // end of function checkOut


}); // end