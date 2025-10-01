const BASE_HOST = "phc.prontonetworks.com";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  try {
    if (changeInfo.status === 'complete' && tab && tab.url && tab.url.includes(BASE_HOST)) {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ['content.js']
      }).catch(() => {
        // silent fail — do not log
      });
    }
  } catch (e) {
    // silent fail
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'closeTab' && sender.tab && sender.tab.id) {
    chrome.tabs.remove(sender.tab.id);
  }
});
