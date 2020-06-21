
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
  chrome.storage.sync.set({limit: null})
})

function limitReached(ID) {
  var limit
  chrome.storage.sync.get(['limit'], function(data) {
    limit = data.limit
  })
  chrome.storage.sync.get(['articles'], function(data) {
    var array = data.articles
    if (array.length >= limit) {
      chrome.storage.sync.set({limitReached: true})
      alert("Yikes! You've gotten over your limit!")
      chrome.tabs.remove(ID)
      //doesn't work for some reason
      // let font = "@font-face {font-family: 'Galactico'; src: url('Galactico-Basic.otf')} * {font-family: 'Galactico'}"
      // let stylesheet = document.createElement("style")
      // stylesheet.type = "text/css"
      // stylesheet.innerText = font
      // document.querySelector("head").appendChild(stylesheet)
    } else if (limit === null) {
      alert("Set a limit!")
    }
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
      // chrome.tabs.remove(sender.tab.id)
    }
  }
)

// chrome.tabs.onUpdate.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.runtime.sendMessage(tabs[0].id)
//   })
// })
