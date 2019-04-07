const commandMapping = {
    clearSessionStorage,
    clearLocalStorage,
    saveSessionStorage,
    loadSessionStorage,
};

chrome.runtime.onMessage.addListener((request) => {
    executeCommand(request.command);
});

function clearSessionStorage() {
    sessionStorage.clear();
    location.reload();

    sendNotification({
        message: 'Session storage cleared.',
        iconUrl: './icons/clear.png',
    });
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload();

    sendNotification({
        message: 'Local storage cleared.',
        iconUrl: './icons/clear.png',
    });
}

function saveSessionStorage() {
    chrome.storage.local.set({ session: Object.entries(sessionStorage) }, () => {
        sendNotification({
            message: 'Session storage saved.',
            iconUrl: './icons/save.png',
        });
    });
}

function loadSessionStorage() {
    chrome.storage.local.get('session', (item) => {
        item.session.forEach((entry) => {
            sessionStorage.setItem(entry[0], entry[1]);
        });

        sendNotification({
            message: 'Session storage loaded.',
            iconUrl: './icons/load.png',
        });
    });
}

function saveLocalStorage() {
    chrome.storage.local.set({ local: Object.entries(localStorage) });
}

function loadLocalStorage() {
    chrome.storage.local.get('local', (item) => {
        item.local.forEach((entry) => {
            localStorage.setItem(entry[0], entry[1]);
        });
    });
}

function sendNotification(options) {
    chrome.runtime.sendMessage({ options, type: 'notification' });
}

function executeCommand(command) {
    commandMapping[command]();
}
