// background.js (debug version)
const BASE = "http://phc.prontonetworks.com/";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  try {
    // Log every update so we can see the real tab URLs
    console.log('[BG] onUpdated', { tabId, status: changeInfo.status, url: tab?.url });

    if (changeInfo.status === 'complete' && tab && tab.url) {
      const url = tab.url;
      // If the tab URL contains the base domain, attempt injection
      if (url.startsWith(BASE) || url.includes('phc.prontonetworks.com')) {
        console.log('[BG] Attempting to inject content.js into tab', tabId, url);

        // Primary: try to inject the file content.js
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['content.js']
        }).then(() => {
          console.log('[BG] executeScript(file) succeeded for tab', tabId);
        }).catch(err => {
          console.warn('[BG] executeScript(file) failed:', err);

          // Fallback: try injecting a tiny function (no eval)
          chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
              // This runs inside the page context if injection is allowed
              console.log('[INJECT TEST] Inline test script ran — content injection allowed');
              // also append a small DOM marker so we can see it in Elements panel
              const marker = document.createElement('div');
              marker.id = 'vit-autologin-marker';
              marker.textContent = 'VIT AutoLogin injected';
              marker.style.position = 'fixed';
              marker.style.bottom = '4px';
              marker.style.right = '4px';
              marker.style.background = 'rgba(0,128,0,0.8)';
              marker.style.color = '#fff';
              marker.style.zIndex = 2147483647;
              marker.style.padding = '2px 6px';
              document.body.appendChild(marker);
            }
          }).then(() => {
            console.log('[BG] Inline func injection succeeded for tab', tabId);
          }).catch(err2 => {
            console.error('[BG] Inline func injection FAILED:', err2);
          });
        });
      }
    }
  } catch (e) {
    console.error('[BG] Unexpected error in onUpdated:', e);
  }
});
