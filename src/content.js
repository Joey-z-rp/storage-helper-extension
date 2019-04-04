chrome.runtime.onMessage.addListener((request) => {
    if (request.text === "clearSessionStorage") {
        sessionStorage.clear();
        location.reload();
    }
});
