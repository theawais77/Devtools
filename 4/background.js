chrome.action.onClicked.addListener(async (tab) => {
    const debuggee = { tabId: tab.id };
    const protocolVersion = "1.3";
  
    try {
      await chrome.debugger.attach(debuggee, protocolVersion);
      console.log("Debugger attached");
  
      await chrome.debugger.sendCommand(debuggee, "Network.enable");
  
      // Clear any previous logs
      chrome.storage.local.set({ networkLogs: [] });
  
      // Listen for network events
      chrome.debugger.onEvent.addListener((source, method, params) => {
        if (source.tabId === tab.id && (method === "Network.requestWillBeSent" || method === "Network.responseReceived")) {
          chrome.storage.local.get("networkLogs", (data) => {
            const networkLogs = data.networkLogs || [];
            networkLogs.push({ method, params });
            chrome.storage.local.set({ networkLogs });
          });
        }
      });
  
    } catch (error) {
      console.error("Error attaching debugger: ", error);
    }
  });
  
  chrome.runtime.onSuspend.addListener(() => {
    chrome.debugger.detach(debuggee, () => {
      console.log("Debugger detached");
    });
  });
  