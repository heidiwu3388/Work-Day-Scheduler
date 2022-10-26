// get elements and save them in variables
var currentDateEl = $("#currentDay");


// get current Date and hour
var currentDate = moment().format("dddd, MMMM Do");


// display current date in header
currentDateEl.text(currentDate);
