chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query(
        { active: true, currentWindow: true },
        tabs => chrome.tabs.sendMessage(tabs[0].id, { command }),
    );
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === 'notification') sendNotification(request.options);
});

function sendNotification(options) {
    const mergedOptions = {
        type: 'basic',
        title: 'Storage Status:',
        iconUrl: './icons/storage.png',
        ...options,
    };
    chrome.notifications.create(mergedOptions);
}
