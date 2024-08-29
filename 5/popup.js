let apiCalls = [];

document.getElementById("downloadLogs").addEventListener("click", () => {
  const blob = new Blob([apiCalls.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "api_calls.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "logAPICall") {
    apiCalls.push(`${request.data.method} ${request.data.url} ${JSON.stringify(request.data.data)}`);
  }
});