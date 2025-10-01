chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url.includes("http://phc.prontonetworks.com/cgi-bin/authlogin?URI=http://www.gstatic.com/generate_204")
  ) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  }
});
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "closeTab" && sender.tab?.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});

