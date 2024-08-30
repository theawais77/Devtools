document.getElementById('download-har').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "download" }, function(response) {
      if (response.status === "success") {
        alert("HAR file downloaded successfully!");
      } else {
        alert("Failed to download HAR file.");
      }
    });
  });
  