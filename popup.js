//edited version
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector("#button1").addEventListener('click', changeLimit, false)
  //document.querySelector("#button2").addEventListener('click', changeCounter, false)
  document.querySelector("#button3").addEventListener('click', resetCounter, false)

chrome.storage.sync.get(['limit'], function(data) {
  if (data.limit != null) {
    let limit = (data.limit > 9) ? `${data.limit}` : `0${data.limit}`
    document.getElementById("max").innerHTML = limit
  }
})

chrome.storage.sync.get(['articles'], function(data) {
  let length = (data.articles.length > 9) ? `${data.articles.length}` : `0${data.articles.length}`
  document.getElementById("counter").innerHTML = length
})

//PREVIOUS FUNCTIONALITY THAT WAS MANUAL (ty yale ;-;)
  // var counter = 1;
  //
  // chrome.storage.sync.get({counter: 1}, function(data) {
  //   //if data.counter is set, then it will use that value
  //   //otherwise, it will use the default value
  //   chrome.storage.sync.set({counter: data.counter}, function() {
  //     counter = data.counter;
  //     });
  // });

  // function changeCounter () {
  //   alert("You've updated your article count!");
  //   if (counter < 10 && !null) {
  //     document.getElementById("counter").innerHTML = "0" + counter;
  //     chrome.storage.sync.set({counter: counter});
  //   } else if (counter >= 10 && !null) {
  //       document.getElementById("counter").innerHTML = counter;
  //       chrome.storage.sync.set({counter: counter}, function() {
  //         console.log('Article count is at ' + counter);
  //       });
  //   }
  //   if (document.getElementById("max").innerHTML !== "XX" && counter > document.getElementById("max").innerHTML) {
  //     alert("You've exceeded your limit for today! Watch out for information overload D:");
  //   }
  //     counter++;
  // }

  function changeLimit () {
    const limit = prompt("How many articles are you reading today?");
    if (limit < 10 && !null) {
      document.getElementById("max").innerHTML = "0" + limit;
    } else if (limit >= 10 && !null) {
        document.getElementById("max").innerHTML = limit;
    }
    chrome.storage.sync.set({limit: limit})
  }

  function resetCounter() {
    alert("You have reset your article count!")
    counter = 0;
    document.getElementById("counter").innerHTML = "XX";
  }
}, false)

// chrome.runtime.onMessage.addListener(
//   function(message, sender, sendResponse) {
//     document.getElementById("timerText").innerHTML = `${message.hours}h ${message.minutes}m ${message.seconds}s`
// })
