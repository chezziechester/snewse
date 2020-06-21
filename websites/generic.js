
//for every article, it always ends with a "index.html" so that was
//resolved in manifest.json
window.addEventListener("load", function() {
  chrome.storage.sync.get(['limitReached'], function(data) {
    var limitReached = data.limitReached
    if (limitReached) {
      chrome.runtime.sendMessage("close this tab")
    } else {
      chrome.runtime.sendMessage("article visited")
    }
  })
})
