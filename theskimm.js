
//so skimm articles have this one class (only in daily skimm tho)
//and im gonna use that to check if it's an article
window.addEventListener("load", function(event) {
  var isArticle = document.getElementsByClassName('mb-4 Heading_display-heading-2__vScJw Heading_heading__2ONbw Heading_display__1Zn22 Heading_heading__2ONbw Heading_display__1Zn22').length
  isArticle += document.getElementsByClassName('text-white pb-5 Heading_display-heading-1__3S5WX Heading_heading__2ONbw Heading_display__1Zn22 Heading_heading__2ONbw Heading_display__1Zn22').length
  console.log(isArticle)
  if (isArticle != 0) {
    chrome.runtime.sendMessage("article visited", function(response) {
      console.log(response)
      //do something with the damn url
    })
  }
})
