
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
        pageUrl: {hostEquals: "www.news.yahoo.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.theskimm.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.nytimes.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.foxnews.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.nbcnews.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: "www.theguardian.com"}
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ])
  })
})

function limitReached(ID) {
  var limit
  chrome.storage.sync.get(['limit'], function(data) {
    limit = data.limit
    chrome.storage.sync.get(['articles'], function(data) {
      var array = data.articles
      if (limit === null) {
        alert("Set a limit!")
      } else if (articles.length > limit) {
        chrome.storage.sync.set({limitReached: true})
        alert("Yikes! You've gotten over your limit!")
        chrome.tabs.remove(ID)
      }
    })
  })
}

//communicate between background and content script because apparently
//you can't use the tabs api nor the storage api in the content script
//fml

//receives the tab url and makes sure it's not repeated
//then adds it to the article array
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message === "article visited") {
      var url = sender.url
      var tabID = sender.tab.id
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
            limitReached(tabID)
          }
        })
      })
    }
})

//close the tab. self-explanatory
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message === "close this tab") {
      alert("No more reading articles for the day.")
      chrome.tabs.remove(sender.tab.id)
    }
  }
)

//sets null for time limit if the value hasn't already been set
chrome.storage.sync.get({limit: null}, function(data) {
  chrome.storage.sync.set({limit: data.limit})
}


// chrome.tabs.onUpdate.addListener(function(tabId, changeInfo, tab) {
//     console.log("It WORKED!")
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.runtime.sendMessage(tabs[0].id, "yo")
//     })
//   })
