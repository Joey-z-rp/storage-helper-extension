let panelWindow;
chrome.devtools.panels.create("Diff",
    undefined,
    "diff.html",
function(panel) {
  panel.onShown.addListener(function (extPanelWindow) {
    panelWindow = extPanelWindow;
  });
});

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'background'
});
backgroundPageConnection.onMessage.addListener(function (message) {
  alert(JSON.stringify(message))
  // Handle responses from the background page, if any
  panelWindow.document.getElementById('title').innerText = JSON.stringify(message.sessionStorage);
  panelWindow.document.getElementById('sec').innerText = JSON.stringify(message.store);
});

// Relay the tab ID to the background page
// backgroundPageConnection.postMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: "content.js"
// });
