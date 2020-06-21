
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.cnn.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.theskimm.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ])
  })
  chrome.storage.sync.set({limitReached: false})
  chrome.storage.sync.set({limit: 0})
})

function limitReached() {
  console.log("hi, at least you got here!")
  var limit
  chrome.storage.sync.get(['limit'], function(data) {
    limit = data.limit
  })
  chrome.storage.sync.get(['articles'], function(data) {
    if (data.length >= limit) {
      console.log(data.length)
      chrome.storage.sync.set({limitReached: true})
      console.log("THIS WORKS")
    } else {
      alert("You need to set a limit!")
    }
  })
}

//communicate between background and content script because apparently
//you can't use the tabs api nor the storage api in the content script
//fml

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message === "article visited") {
      var url = sender.url
      var articleArray
      var repeated

      chrome.storage.sync.get({articles: []}, function(data) {
        chrome.storage.sync.set({articles: data.articles}, function() {
          articleArray = data.articles
          //checks to make sure an article isn't repeated
          for (indexNumber in articleArray) {
            if (url === articleArray[indexNumber]) {
              repeated = true
            }
          }
          console.log(articleArray)
          if (!repeated) {
            articleArray.push(url)
            chrome.storage.sync.set({articles: articleArray})
            limitReached()
          }
        })
      })
    }
})
