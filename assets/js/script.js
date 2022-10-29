// get current Date and hour
var currentDate = moment().format("dddd, MMMM Do");
//var currentHour = parseInt(moment().format("H"));


//****** for testing purpose ******/
// var currentDate = "Satuday, October 29th";
currentHour = 13; 
//****** for testing purpose ******/

// get elements and save them in variables
var currentDateEl = $("#currentDay");
var containerEl = $(".container");

// create an empty object to store the schedule
const schedule = {
    date: currentDate,
    allHourTask:[]
}




console.log(currentHour);
function setTimeBlockStyle() {
    // loop for each time block (row) in the container
    for (i=0; i<containerEl.children().length; i++ ) {
        // get the time block hour
        let thisRow = containerEl.children().eq(i);
        let timeBlockHour = parseInt(thisRow.attr("data-hour"));
        // set styling class and disable textarea base on whether the time block is past, present or future
        if (timeBlockHour < currentHour) {
            console.log("time block hour: ", timeBlockHour, "(past)");
            thisRow.children("textarea").addClass("past").attr("disabled", true);
            thisRow.children(".saveBtn").text("");
        } else if (timeBlockHour === currentHour) {
            console.log("time block hour: ", timeBlockHour, "(present)");
            thisRow.children("textarea").addClass("present").attr("disabled", true);
            thisRow.children(".saveBtn").text("");
        } else {
            console.log("time block hour: ", timeBlockHour, "(future)");
            thisRow.children("textarea").addClass("future");
        }
    }
}

function loadData() {
    console.log ("load data");
    // get previous schedule from local storage
    let prevSchedule = JSON.parse(localStorage.getItem("schedule"));
    console.log("prevSchedule : \n", prevSchedule);
    // if previous schedule exist and the date is today
    if (prevSchedule !== null && prevSchedule.date === currentDate) {
        // update the schedule object with data from local storage
        schedule.allHourTask = prevSchedule.allHourTask;
        // display task in each time block
        for (let i=0; i<schedule.allHourTask.length; i++) {
                let hour = schedule.allHourTask[i].hour;
                let task = schedule.allHourTask[i].task;
                console.log ("hour and task: ", hour, task);
                let selector = `div[data-hour='${hour}']`;
                console.log("selector: ", selector);
                // containerEl.children(selector).children("textarea").val = task;
                containerEl.children(selector).children("textarea").val(task);
            }
            // children("textarea").val = task;
        
    }
    console.log("schedule: ", schedule);
    return;
}

function saveTask(event) {
    let clickedBtnEl = $(event.target);
    let textEl = clickedBtnEl.parent().children("textarea");
    // do nothing for past and present time block
    if (textEl.hasClass("past") || textEl.hasClass("present")) {
        console.log("past or present save clicked")
        return; 
    }
    console.log("future save clicked");
    // get the hour and task from the clicked row
    let hour = parseInt(clickedBtnEl.parent().attr("data-hour"));
    let task = textEl.val().trim();
    console.log("hour: ", hour);
    console.log("task: ", task);
    // look for the hour block in the schedule object
    found = false;
    for (let i=0; i<schedule.allHourTask.length; i++){
        // if the hour block is found, update it with new task
        if (schedule.allHourTask[i].hour === hour) {
            found = true;
            console.log("found");
            schedule.allHourTask[i].task = task;
        }
    }
    // if the hour block is not found in the schedule object
    if (!found){
        console.log("not found");
        // create a new time block with current hour and task
        const hourTask = {
            hour: hour,
            task: task
        }
        console.log("hourTask : ", hourTask);
        // append the new time block to the schedule object
        schedule.allHourTask.push(hourTask);
        
    }
    
    // store the schedule object into the local storage
    console.log("schedule : ", schedule);
    localStorage.setItem("schedule", JSON.stringify(schedule));
    clickedBtnEl.text("saved");
}

function handleTextFocus(event) {
    $(event.target).parent().children(".saveBtn").text("💾");

}
currentDateEl.text(currentDate); // display current date in header
loadData(); // load data from local starage
setTimeBlockStyle(); // apply different style base on whether the time block is past, present or future
containerEl.on("click", ".saveBtn", saveTask); // add event listener for save buttons
containerEl.on("focus", "textarea", handleTextFocus) ;


