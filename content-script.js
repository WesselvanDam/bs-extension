// Function that detects content frames and injects the button
function mainLoop() {
  var element = document
    .getElementsByTagName("d2l-iframe-wrapper-for-react")
    .item(0);
  var newTabButtonList = document.getElementsByClassName("open-in-new-tab-btn");
  if (element == null && newTabButtonList.length > 0) {
    newTabButtonList.item(0).style.visibility = "hidden";
    return;
  }
  if (newTabButtonList.length > 0) {
    newTabButtonList.item(0).style.visibility = "visible";
    return;
  }
  var buttonTray = document
    .getElementsByClassName("header-button-tray")
    .item(0);
  buttonTray.insertAdjacentHTML(
    "beforeend",
    `
      <button class="open-in-new-tab-btn" onclick=
        "window.open(document.getElementsByTagName('d2l-iframe-wrapper-for-react').item(0).getAttribute('src'))">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
      </button>
    `
  );
}
// Initial run
setTimeout(function () {
  mainLoop();
}, 1000);

// Continuous checking is required as content frames are not present when a BrightSpace 'unit' is selected
document.addEventListener("click", function () {
  setTimeout(function () {
    mainLoop();
  }, 1000);
});
