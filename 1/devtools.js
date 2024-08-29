chrome.devtools.network.onRequestFinished.addListener((request) => {
    request.getContent((content, encoding) => {
      console.log("Captured request:", request.request.url); // Log captured requests
      chrome.runtime.sendMessage({
        url: request.request.url,
        method: request.request.method,
        status: request.response.status,
        content: content || '',
        encoding: encoding || ''
      });
    });
  });
  