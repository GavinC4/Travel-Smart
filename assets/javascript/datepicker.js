//     $(".date-picker").datepicker();

//     $(".date-picker").on("change", function () {
//     var id = $(this).attr("id");
//     var val = $("label[for='" + id + "']").text();
//     console.log(val);
//     console.log(id);
//     console.log(this.date);
//     $("#msg").text(val + " changed");
// });

    var options = {
    minDate: new Date(2001, 0, 1, 12),
    maxDate: new Date(2001, 11, 31),
    //dateFormat: "M d",
    changeMonth: true,
    changeYear: true,
    gotoCurrent:false,
    beforeShow: function (inputEl, datepickerInst) {
        console.log("before show");
        //datepickerInst.input[0].value =  datepickerInst.selectedMonth + "/" + datepickerInst.selectedDay + "/" + datepickerInst.selectedYear;

        console.log("selected Year/Month/Day", datepickerInst.selectedYear,
            "/", datepickerInst.selectedMonth,
            "/", datepickerInst.selectedDay);
        console.log("current Year/Month/Day", datepickerInst.currentYear,
            "/", datepickerInst.currentMonth,
            "/", datepickerInst.currentDay);
        console.log("draw Year/Month/Day", datepickerInst.drawYear,
            "/", datepickerInst.drawMonth,
            "/", datepickerInst.drawDay);

        console.log(datepickerInst);
        //datepickerInst.input[0].hidden = true;

    },
    onClose: function(date, inst){
        console.log(date);
        console.log(inst);
        //inst.input[0].value=inst.selectedMonth + "/" + inst.selectedYear;
    }

};
