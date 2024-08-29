document.getElementById('download').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'download' });
  });
  