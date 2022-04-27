console.log("Running Content Script")
// alert('File test alert');
document.body.style.backgroundColor = 'orange';
document.get
var element = document.getElementsByClassName("d2l-fra-iframe")[0].firstChild;
console.log(element);
// console.log(element.getElementsByClassName(""))
// chrome.action.onClicked.addListener(function(tab) {
//     chrome.tabs.create({
//         'url': chrome.extension.getURL('page.html')
//     }, function(tab) {

//     });
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     console.log("Request received!")
//     if (request.action === 'open-pdf') {
//         const documentName = document.querySelector('.text-wrapper').innerText;
//         sendResponse({ documentName });
//     }
// });