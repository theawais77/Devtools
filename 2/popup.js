document.addEventListener("DOMContentLoaded", function() {
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.addEventListener("click", function() {
      chrome.runtime.sendMessage({ action: "download-api-calls" });
    });
  });