document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', onclick, false)

  function onclick () {
    const limit = prompt("How many articles are you reading today?");
    if (limit < 10 && !null) {
      document.getElementById("max").innerHTML = "0" + limit;
    } else if (limit >= 10 && !null) {
        document.getElementById("max").innerHTML = limit;
    }
  }
}, false)

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log("made it...")
    document.getElementById("timerText").innerHTML = `${message.hours}h ${message.minutes}m ${message.seconds}s`
})

// COUNT THE ARTICLES
// var url
// var articlesRead = []
//
// chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
//   url = tabs[0].url
// })


//note: cnn articles end with an "index.html"
