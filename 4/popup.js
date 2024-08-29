document.getElementById("downloadLogs").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.debugger.attach(tabs[0].id, "1.2", () => {
      chrome.debugger.sendCommand(tabs[0].id, "Network.getHAR", {}, (harLogs) => {
        const blob = new Blob([JSON.stringify(harLogs, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "networkLogs.har";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });
  });
});