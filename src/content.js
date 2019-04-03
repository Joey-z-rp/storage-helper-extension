let store = {};

function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('inject.js'), 'html');

var storageHandler = function(e) {
    chrome.runtime.sendMessage({sessionStorage, store});
    store = JSON.parse(JSON.stringify(sessionStorage));
};

document.addEventListener("itemInserted", storageHandler, false);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.text === "clearSessionStorage") {
            sessionStorage.clear();
            location.reload();
        }
    });
