
window.addEventListener("load", function() {
  chrome.storage.sync.get(['limitReached'], function(data) {
    var limitReached = data.limitReached
    if (limitReached) {
      chrome.runtime.sendMessage("close this tab")
    } else {
      var isArticle = document.getElementsByClassName('wsj-article-headline').length
      if (isArticle != 0) {
        chrome.runtime.sendMessage("article visited")
      }
    }
  })
})
