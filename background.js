const baseDomain = "https://phc.prontonetworks.com/";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url.startsWith(baseDomain)
  ) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"]
    });
  }
});
