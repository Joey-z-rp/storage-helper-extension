// // Copyright (c) 2012 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.
//
// // The function below is executed in the context of the inspected page.
// var page_getProperties = function() {
//   var data = window.jQuery && $0 ? jQuery.data($0) : {};
//   // Make a shallow copy with a null prototype, so that sidebar does not
//   // expose prototype.
//   var props = Object.getOwnPropertyNames(data);
//   var copy = { __proto__: null };
//   for (var i = 0; i < props.length; ++i)
//     copy[props[i]] = data[props[i]];
//   return copy;
// }
//
// chrome.devtools.panels.elements.createSidebarPane(
//     "jQuery Properties",
//     function(sidebar) {
//   function updateElementProperties() {
//     sidebar.setExpression("(" + page_getProperties.toString() + ")()");
//   }
//   updateElementProperties();
//   chrome.devtools.panels.elements.onSelectionChanged.addListener(
//       updateElementProperties);
// });

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
  alert(message)
  document.getElementById('title').innerText = message;
});
console.log(backgroundPageConnection)

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content.js"
});

console.log({ tabId: chrome.devtools.inspectedWindow.tabId})
