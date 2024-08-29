let networkData = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.url) {
    console.log("Storing request data:", message); // Log stored data
    networkData.push(message);
  }
  
  if (message.action === 'getNetworkData') {
    sendResponse({ networkData: networkData });
  }
});
