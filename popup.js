chrome.tabs.getSelected(null, tab => {
    console.log("tab ${tab}")
    if (tab.url.includes('brightspace') && tab.url.includes('topics')) {
        console.log("revealing the button")
        document.querySelector('.button-panel').classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pdf-button').addEventListener(
        'click', console.log("Clicked the button here.")
    )
})

document.querySelector('.open-pdf').addEventListener('click', () => {
    console.log("Clicked the button!")
    chrome.tabs.sendMessage(tab.id, { action: 'open-pdf' }, response => {
        console.log(response);
    });
});