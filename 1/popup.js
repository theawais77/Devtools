document.getElementById('download').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getNetworkData' }, (response) => {
      if (response && response.networkData) {
        const blob = new Blob([JSON.stringify(response.networkData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename: 'networkData.txt',
          conflictAction: 'overwrite',
          saveAs: true
        });
      } else {
        console.error('No network data found');
      }
    });
  });
  