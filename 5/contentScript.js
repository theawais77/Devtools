function logAPICall(url, method, data) {
    console.log(`API Call: ${method} ${url} ${JSON.stringify(data)}`);
    chrome.runtime.sendMessage({ action: "logAPICall", data: { url, method, data } });
  }
  
  // Intercept API calls
  XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
    logAPICall(url, method, {});
    return this._open(method, url, async, user, password);
  };
  
  XMLHttpRequest.prototype.send = function (data) {
    logAPICall(this.url, this.method, data);
    return this._send(data);
  };
  
  fetch = (originalFetch => {
    return (...args) => {
      logAPICall(args[0], "fetch", args[1]);
      return originalFetch(...args);
    };
  })(fetch);