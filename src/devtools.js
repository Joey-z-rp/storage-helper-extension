
chrome.devtools.panels.create("Diff",
    undefined,
    "diff.html",
function(panel) { console.log('init devtool')});

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'background'
});
backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
  console.log(`in devtool: ${message}`)
});

// Relay the tab ID to the background page
// backgroundPageConnection.postMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: "content.js"
// });
