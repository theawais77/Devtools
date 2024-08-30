document.getElementById('download').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "download" }, (response) => {
      if (response.status === "success") {
        alert("Requests downloaded successfully!");
      } else {
        alert("Failed to download requests.");
      }
    });
  });
  