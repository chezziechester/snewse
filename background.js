
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
