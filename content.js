
//ARTICLE FUNCTIONALITY
let limit = prompt("How many articles are you reading today?");
//asks for and records personalized reading goal
var numArticles = 0; //number of articles opened/read
//every time the user opens an article
//should we only count an article if the user spends more than, say, 1 minute reading it?
numArticles++;
//this is just a very vague idea for logging the number of articles

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
