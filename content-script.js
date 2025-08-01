/**
 * Tries to find the source URL for the content, first by looking for a .topic-display
 * element in the main document, and then by looking for a d2l-iframe-wrapper-for-react
 * element.
 */
async function findSourceUrl() {
  // PDFs: The selector looks for a child of .topic-display that has a 'src' attribute.
  const directSourceElement = document.querySelector(".topic-display > *[src]");
  if (directSourceElement) {
    return directSourceElement.getAttribute("src");
  }

  // Video or Text: The selector looks for the 'src' attribute of the
  // <d2l-iframe-wrapper-for-react> element.
  const iframeSourceElement = document.querySelector("d2l-iframe-wrapper-for-react[src]");
  if (iframeSourceElement) {
    return iframeSourceElement.getAttribute("src");
  }
}

/**
 * Manages the "Open in new tab" button. It creates, updates, shows, or hides the
 * button based on whether a source URL is available.
 * @param {string|null} sourceUrl - The URL for the button to link to, or null.
 */
function manageButton(sourceUrl) {
  const buttonTray = document.querySelector(".header-button-tray");
  if (!buttonTray) return; // Exit if the place to put the button doesn't exist.

  const buttonId = "extension-open-in-new-tab-btn";
  let button = document.getElementById(buttonId);

  if (!sourceUrl) {
    // If there's no source URL, hide the button if it exists.
    if (button) {
      button.style.display = "none";
    }
    return;
  }

  // A source URL exists.
  if (button) {
    // If button already exists, update its link and make sure it's visible.
    button.href = sourceUrl;
    button.style.display = "inline-flex";
  } else {
    // If button doesn't exist, create it as a proper link (<a> tag).
    button = document.createElement("a");
    button.id = buttonId;
    button.href = sourceUrl;
    button.target = "_blank"; // Ensures the link opens in a new tab.
    button.rel = "noopener noreferrer"; // Security best practice for new tabs.
    button.title = "Open content in new tab"; // Accessibility improvement.

    // Add the SVG icon inside the button.
    // 'currentColor' makes the icon adopt the color of the link text.
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"/>
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    `;

    buttonTray.appendChild(button);
  }
}

/**
 * Main function to be executed. Finds the source URL and updates the button accordingly.
 * This is an async function to correctly handle the promise from findSourceUrl.
 */
async function main() {
  const sourceUrl = await findSourceUrl();
  manageButton(sourceUrl);
}

// --- Script Execution ---

// Set up a MutationObserver to react to dynamic content changes on the page.
// This is far more efficient than listening for clicks and using timeouts.
let debounceTimer;
const observer = new MutationObserver(() => {
  // Clear the old timer
  clearTimeout(debounceTimer);

  // Set a new timer. The main() function will only run after 250ms
  // of no new mutations.
  debounceTimer = setTimeout(main, 250);
});

// Start observing the entire document body for added/removed nodes.
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Run the main function once when the script is first injected to handle the initial page state.
main();