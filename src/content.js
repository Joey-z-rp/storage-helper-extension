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
}

function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

function saveSessionStorage() {
    chrome.storage.local.set({ session: Object.entries(sessionStorage) });
}

function loadSessionStorage() {
    chrome.storage.local.get('session', (item) => {
        item.session.forEach((entry) => {
            sessionStorage.setItem(entry[0], entry[1]);
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

function executeCommand(command) {
    commandMapping[command]();
}
