let networkLogs = [];

chrome.action.onClicked.addListener((tab) => {
    chrome.debugger.attach({ tabId: tab.id }, "1.3", () => {
        chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");

        chrome.debugger.onEvent.addListener((source, method, params) => {
            if (method === "Network.requestWillBeSent") {
                networkLogs.push({
                    url: params.request.url,
                    method: params.request.method,
                    headers: JSON.stringify(params.request.headers),
                    postData: params.request.postData || ''
                });
            }
        });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "downloadLogs") {
        if (networkLogs.length === 0) {
            alert("No logs to download");
            return;
        }

        const blob = new Blob([JSON.stringify(networkLogs, null, 2)], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: 'network_logs.txt',
            conflictAction: 'overwrite'
        });

        // Clear logs after download
        networkLogs = [];
        sendResponse({ status: "completed" });
    }
});
