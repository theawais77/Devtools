let interceptedRequests = [];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    interceptedRequests.push({
      url: details.url,
      method: details.method,
      headers: JSON.stringify(details.requestHeaders, null, 2),
      requestBody: details.requestBody ? JSON.stringify(details.requestBody, null, 2) : ''
    });
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    const blob = new Blob([interceptedRequests.map(req => `URL: ${req.url}\nMethod: ${req.method}\nHeaders: ${req.headers}\nRequest Body: ${req.requestBody}\n\n`).join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "intercepted_requests.txt",
      saveAs: true
    });

    interceptedRequests = []; 
    sendResponse({ status: "success" });
  }
});
