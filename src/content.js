let store = {};

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('inject.js'), 'html');

const storageHandler = function(event) {
    chrome.runtime.sendMessage({
        key: event.detail.key,
        previousValue: store[event.detail.key],
        currentValue: event.detail.value,
    });

    store = JSON.parse(JSON.stringify(sessionStorage));
};

document.addEventListener("itemInserted", storageHandler, false);

chrome.runtime.onMessage.addListener((request) => {
    if (request.text === "clearSessionStorage") {
        sessionStorage.clear();
        location.reload();
    }
});
