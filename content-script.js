// Function that detects content frames and injects the button
function mainLoop() {
  // Get the source attribute of the first child of the 'topid-display' element
  var source = null;
  try {
    source = document
      .getElementsByClassName("topic-display")
      .item(0)
      .firstElementChild.getAttribute("src");
  } finally {
    console.log("Source: " + source)
  }

  var newTabButtonList = document.getElementsByClassName("open-in-new-tab-btn");
  console.log("Button list: " + newTabButtonList.length);
  // No source, but button does not exist: do nothing
  if (source == null && newTabButtonList.length == 0) {
    return;
  }
  // No source, but button exists: hide button
  if (source == null && newTabButtonList.length > 0) {
    newTabButtonList.item(0).style.visibility = "hidden";
    return;
  }
  // Source exists and button exists: show button
  if (newTabButtonList.length > 0) {
    newTabButtonList.item(0).style.visibility = "visible";
    return;
  }
  // Source exists and button does not exist: insert button
  var buttonTray = document
    .getElementsByClassName("header-button-tray")
    .item(0);
  if (buttonTray == null) return;
  insertButton(buttonTray, source);
}

function insertButton(buttonTray, source) {
  buttonTray.insertAdjacentHTML(
    "beforeend",
    `
      <button class="open-in-new-tab-btn" onclick=
        "window.open('${source}')">
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
