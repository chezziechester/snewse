
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
  ]);
  });
});

//communicate between background and content script because apparently
//you can't use the tabs api nor the storage api in the content script
//fml

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message === "article visited") {
      sendResponse(sender.url)
      return true
    }
})
