chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((content, encoding) => {
      const logEntry = {
        url: request.request.url,
        method: request.request.method,
        status: request.response.status,
        content: content,
        encoding: encoding
      };
      chrome.runtime.sendMessage({ type: 'log', data: logEntry });
    });
  });
  