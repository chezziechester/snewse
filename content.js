
//wrap everything in a nice little bow
//so that it doesn't fire E V E R Y T I M E you open the news website
//and only while reading the article
//doesn't work for some reason, if you remove the listener it works

// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
    //TIMER FUNCTIONALITY

    //"starting time" for when the user first visited a news website
    var start
    //to compare to today's date so it can refresh the time
    var date
    var tmpDate = new Date()
    //used as reference to calculate the other values
    var tmpSeconds
    var seconds = 0
    var minutes = 0
    var hours = 0

    chrome.storage.sync.get({startTime: Date.now()}, function(data) {
      //if data.startTime is set, then it will use that value
      //otherwise, it will use the default value
      chrome.storage.sync.set({startTime: data.startTime}, function() {
        start = data.startTime
        //a copy of the below code; mostly just so it WORKS WHEN THE LIMIT IS REACHED
        tmpSeconds = Math.round((Date.now() - start) / 1000)
        seconds = tmpSeconds % 60
        if (((tmpSeconds / 60) % 60) >= 1) {
          minutes = Math.floor((tmpSeconds / 60) % 60)}
        if (((tmpSeconds / 60) / 60) >= 1 ) {
          hours = Math.floor((tmpSeconds / 60) / 60)}
        let doubleDigitSeconds = (seconds > 9) ? `${seconds}` : `0${seconds}`
        let doubleDigitMinutes = (minutes > 9) ? `${minutes}` : `0${minutes}`
        let doubleDigitHours = (hours > 9) ? `${hours}` : `0${hours}`
        document.getElementById("timerText").innerHTML = `time spent: ${doubleDigitHours}h ${doubleDigitMinutes}m ${doubleDigitSeconds}s`
      });
    });

    chrome.storage.sync.get({date: tmpDate.getDate()}, function(data) {
      //same concept as above
      chrome.storage.sync.set({date: data.date}, function() {
        date = data.date
      });
    });

    //updates every second
    setInterval(function() {
      //needs to update every second as to check for new date...
      tmpDate = new Date()
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

      if (date != tmpDate.getDate()) {
        chrome.storage.sync.set({date: tmpDate.getDate()}, function() {
          date = tmpDate.getDate()
        })
        //resets everything
        chrome.storage.sync.set({startTime: Date.now()}, function() {
          start = Date.now()
          hours = 0
          minutes = 0
          seconds = 0
          chrome.storage.sync.set({limitReached: false})
          chrome.storage.sync.set({limit: null})
        })
      }

      //for aesthetics ;)
      let doubleDigitSeconds = (seconds > 9) ? `${seconds}` : `0${seconds}`
      let doubleDigitMinutes = (minutes > 9) ? `${minutes}` : `0${minutes}`
      let doubleDigitHours = (hours > 9) ? `${hours}` : `0${hours}`

      chrome.storage.sync.get(['limitReached'], function(data) {
        var limitReached = data.limitReached
        if (!limitReached) {
          document.getElementById("timerText").innerHTML = `time spent: ${doubleDigitHours}h ${doubleDigitMinutes}m ${doubleDigitSeconds}s`
        }
      })
      //chrome.runtime.sendMessage({seconds: doubleDigitSeconds, minutes: doubleDigitMinutes, hours: doubleDigitHours})

    }, 1000)
//   }
// )
