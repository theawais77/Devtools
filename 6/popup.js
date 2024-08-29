document.getElementById('downloadButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: "downloadLogs" }, (response) => {
        if (response.status === "completed") {
            console.log("Download started");
        } else {
            console.error("Failed to download logs");
        }
    });
});
