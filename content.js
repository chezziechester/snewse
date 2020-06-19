
//ARTICLE FUNCTIONALITY

//TIMER FUNCTIONALITY
var start = Date.now();
var seconds = 0
var minutes = 0
var hours = 0

//updates every second
setInterval(function() {
  //gets the difference in milliseconds from the starting time
  //then converts to seconds
  seconds = Math.round((Date.now() - start) / 1000)
  //making sure to update if either seconds or minutes hit 60
  if (seconds >= 60) {
    minutes++
    seconds = 0
    start = Date.now()
  }
  if (minutes >= 60) {
    hours++
    minutes = 0
  }

  document.getElementById("timerText").innerHTML = `${hours}h ${minutes}m ${seconds}s`
}, 1000)
