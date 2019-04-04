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
  const key = document.createElement('div');
  key.innerText = message.key;
  const pre = document.createElement('div');
  pre.innerText = message.prepreviousValue;
  const current = document.createElement('div');
  current.innerText = message.currentValue;
  panelWindow.document.body.appendChild(key)
  panelWindow.document.body.appendChild(pre)
  panelWindow.document.body.appendChild(current)
});

// Relay the tab ID to the background page
// backgroundPageConnection.postMessage({
//   tabId: chrome.devtools.inspectedWindow.tabId,
//   scriptToInject: "content.js"
// });
