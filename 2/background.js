let apiCalls = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Received message:", request);
    if (request.action === "log-api-calls") {
    apiCalls = request.apiCalls;
  } else if (request.action === "download-api-calls") {
    if (apiCalls.length > 0) {
        console.log("Downloading API calls..."); // Add this line
      const txtFile = new Blob([apiCalls.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(txtFile);
      chrome.downloads.download({ url: url, filename: "api-calls.txt" });
    }
  }
});