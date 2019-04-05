const commandMapping = {
    'clear-session-storage': clearSessionStorage,
    'clear-local-storage': clearLocalStorage,
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

function executeCommand(command) {
    commandMapping[command]();
}
