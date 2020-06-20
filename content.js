
//TIMER FUNCTIONALITY

//"starting time" for when the user first visited a news website
var start
//used as reference to calculate the other values
var tmpSeconds
var seconds = 0
var minutes = 0
var hours = 0

var defaultValue = Date.now()
chrome.storage.sync.get({startTime: defaultValue}, function(data) {
  //if data.startTime is set, then it will use that value
  //otherwise, it will use the default value
  chrome.storage.sync.set({startTime: data.startTime}, function() {
    start = data.startTime
  });
});

//updates every second
setInterval(function() {
  //gets the difference in milliseconds from the starting time
  //then converts to seconds
  //only temporary because i need it for the other values
  tmpSeconds = Math.round((Date.now() - start) / 1000)
  //the actual seconds value
  seconds = tmpSeconds % 60
  //first check the value isn't under 1
  if (((tmpSeconds / 60) % 60) >= 1) {
    //get number of minutes first
    //then get the remainder when divided by 60 (as to not count the hours)
    minutes = Math.floor((tmpSeconds / 60) % 60)
  }
  if (((tmpSeconds / 60) / 60) >= 1 ) {
    hours = Math.floor((tmpSeconds / 60) / 60)
  }

  document.getElementById("timerText").innerHTML = `${hours}h ${minutes}m ${seconds}s`
}, 1000)
