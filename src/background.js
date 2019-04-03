var port;
chrome.runtime.onConnect.addListener(function(devToolsConnection) {
    var devToolsListener = function(message, sender, sendResponse) {
        // Inject a content script into the identified tab


        // chrome.tabs.executeScript(message.tabId,
        //     { file: message.scriptToInject });

        console.log(`in background, id: ${message.tabId}`)
        alert(`in background, id: ${message.tabId}`)

    };
    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function() {
        devToolsConnection.onMessage.removeListener(devToolsListener);
    });

    port = devToolsConnection;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        var tabId = sender.tab.id;
        port.postMessage(request)
    } else {
        alert("sender.tab not defined.");
    }
    return true;
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'clear-session-storage') {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text:"clearSessionStorage"});
        });
    }
});
