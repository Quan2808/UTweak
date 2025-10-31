/**
 * Background Service Worker
 * Manages extension lifecycle and communication
 */

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[Background] Extension installed');
    
    // Set default settings
    chrome.storage.sync.set({
      autoConfirmEnabled: true,
      logoReplaceEnabled: true,
    });
  } else if (details.reason === 'update') {
    console.log('[Background] Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Message handler from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[Background] Received message:', request);
  
  switch (request.action) {
    case 'getSettings':
      chrome.storage.sync.get(
        ['autoConfirmEnabled', 'logoReplaceEnabled', 'adCleanupEnabled'],
        (settings) => {
          sendResponse({ success: true, settings });
        }
      );
      return true; // Keep channel open for async response
      
    case 'updateSettings':
      chrome.storage.sync.set(request.settings, () => {
        console.log('[Background] Settings updated:', request.settings);
        sendResponse({ success: true });
        
        // Notify all YouTube tabs to reload
        chrome.tabs.query(
          { url: ['*://www.youtube.com/*', '*://music.youtube.com/*'] },
          (tabs) => {
            tabs.forEach((tab) => {
              chrome.tabs.sendMessage(tab.id, {
                action: 'settingsUpdated',
                settings: request.settings
              }).catch(() => {
                // Ignore errors if content script not ready
              });
            });
          }
        );
      });
      return true;
      
    case 'getStats':
      // Return extension statistics
      sendResponse({
        success: true,
        stats: {
          version: chrome.runtime.getManifest().version,
          installDate: Date.now(),
        }
      });
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  console.log('[Background] Extension icon clicked');
});

// Keep service worker alive
chrome.runtime.onStartup.addListener(() => {
  console.log('[Background] Browser started, service worker active');
});

console.log('[Background] Service worker initialized');