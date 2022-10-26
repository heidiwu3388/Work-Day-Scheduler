// get elements and save them in variables
var currentDateEl = $("#currentDay");
var containerEl = $(".container");


// get current Date and hour
var currentDate = moment().format("dddd, MMMM Do");


//****** for testing purpose ******/
//var currentHour = parseInt(moment().format("H"));
currentHour = 12; 
//****** for testing purpose ******/

console.log(currentHour);
function setTimeBlockStyle() {
    // loop for each time block (row) in the container
    for (i=0; i<containerEl.children().length; i++ ) {
        // get the time block hour
        let thisRow = containerEl.children().eq(i);
        timeBlockHour = parseInt(thisRow.attr("data-hour"));
        // set styling class and disable textarea base on whether the time block is past, present or future
        if (timeBlockHour < currentHour) {
            console.log("time block hour: ", timeBlockHour, "(past)");
            thisRow.children("textarea").addClass("past").attr("disabled",true);
        } else if (timeBlockHour === currentHour) {
            console.log("time block hour: ", timeBlockHour, "(present)");
            thisRow.children("textarea").addClass("present").attr("disabled",true);
        } else {
            console.log("time block hour: ", timeBlockHour, "(future)");
            thisRow.children("textarea").addClass("future").attr("disabled",false);
        }

    }
}



// display current date in header
currentDateEl.text(currentDate);
// apply different style base on whether the time block is past, present or future
setTimeBlockStyle();
