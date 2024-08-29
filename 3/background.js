let networkLogs = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'log') {
    networkLogs.push(request.data);
  } else if (request.type === 'download') {
    const logString = networkLogs.map(log => JSON.stringify(log)).join('\n');
    const blob = new Blob([logString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'network_logs.txt'
    });
  }
});
