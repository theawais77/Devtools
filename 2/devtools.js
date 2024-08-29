chrome.devtools.network.onRequestFinished.addListener(function(request) {
    chrome.devtools.network.getHAR(function(harLog) {
      let apiCalls = [];
      apiCalls = harLog.entries.filter(function(entry) {
        return entry.request.method === "GET" || entry.request.method === "POST";
      });
      console.log("apiCalls:", apiCalls); // Add this line
      chrome.runtime.sendMessage({ action: "log-api-calls", apiCalls: apiCalls });
    });
  });