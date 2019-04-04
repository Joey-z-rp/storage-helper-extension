chrome.commands.onCommand.addListener((command) => {
    if (command === 'clear-session-storage') {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            tabs => chrome.tabs.sendMessage(tabs[0].id, { text:'clearSessionStorage' }),
        );
    }
});
