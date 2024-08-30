let harEntries = [];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const entry = {
      startedDateTime: new Date(details.timeStamp).toISOString(),
      request: {
        method: details.method,
        url: details.url,
        headers: [],
        postData: details.requestBody ? JSON.stringify(details.requestBody, null, 2) : ''
      },
      response: {
        headers: [],
        status: 0,
        statusText: ''
      },
      timings: {
        blocked: -1,
        dns: -1,
        connect: -1,
        send: 0,
        wait: 0,
        receive: 0,
        ssl: -1
      }
    };
    harEntries.push(entry);
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    const entry = harEntries.find(e => e.request.url === details.url && !e.response.status);
    if (entry) {
      entry.response.status = details.statusCode;
      entry.response.statusText = details.statusLine;
      entry.response.headers = details.responseHeaders;
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

chrome.webRequest.onCompleted.addListener(
  function(details) {
    const entry = harEntries.find(e => e.request.url === details.url && e.response.status === details.statusCode);
    if (entry) {
      entry.timings.receive = details.timeStamp - new Date(entry.startedDateTime).getTime();
    }
  },
  { urls: ["<all_urls>"] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "download") {
    const har = {
      log: {
        version: "1.2",
        creator: {
          name: "Chrome Extension",
          version: "1.0"
        },
        entries: harEntries
      }
    };
    const blob = new Blob([JSON.stringify(har, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: "network_log.har",
      saveAs: true
    });

    harEntries = []; // Clear after download
    sendResponse({ status: "success" });
  }
});
