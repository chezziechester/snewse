
//fox news have a h1 with a class of "headline"
window.addEventListener("load", function() {
  chrome.storage.sync.get(['limitReached'], function(data) {
    var limitReached = data.limitReached
    if (limitReached) {
      chrome.runtime.sendMessage("close this tab")
    } else {
      var isArticle = document.getElementsByClassName('headline').length
      if (isArticle != 0) {
        chrome.runtime.sendMessage("article visited")
      }
    }
  })
})
