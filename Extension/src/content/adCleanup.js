/**
 * YouTube Ad Cleanup
 * Removes advertisement elements from YouTube pages
 */

// Ad selectors to remove
const adsSelector = [
  { parent: "ytd-rich-item-renderer", child: "ytd-ad-slot-renderer" },
  { parent: "ytd-rich-section-renderer" },
  { parent: "ytd-display-ad-renderer" },
  { parent: "ytd-video-masthead-ad-v3-renderer" },
  { parent: "ytd-primetime-promo-renderer" },
  { parent: "ytd-ad-slot-renderer" },
  { parent: "ytd-in-feed-ad-layout-renderer" },
  { parent: "ytd-banner-promo-renderer" },
  { parent: "ytd-statement-banner-renderer" }
];

/**
 * Remove ad elements from the page
 */
function premiumCleanup() {
  let removedCount = 0;
  
  adsSelector.forEach((selector) => {
    document.querySelectorAll(selector.parent).forEach(item => {
      if (selector.child) {
        // If has child selector, only remove if child exists
        if (item.querySelector(selector.child)) {
          item.remove();
          removedCount++;
        }
      } else {
        // No child selector, remove parent directly
        item.remove();
        removedCount++;
      }
    });
  });
  
  if (removedCount > 0) {
    console.log(`[Ad Cleanup] Removed ${removedCount} ad elements`);
  }
}

/**
 * Initialize the ad cleanup timer
 */
function initPremiumCleanup() {
  if (window.premiumCleanupTimer) return;
  
  console.log('[Ad Cleanup] Started monitoring for ads');
  
  // Run cleanup every second
  window.premiumCleanupTimer = setInterval(premiumCleanup, 1000);
  
  // Run immediately
  premiumCleanup();
}

/**
 * Stop the ad cleanup timer
 */
function stopPremiumCleanup() {
  if (window.premiumCleanupTimer) {
    clearInterval(window.premiumCleanupTimer);
    window.premiumCleanupTimer = null;
    console.log('[Ad Cleanup] Stopped monitoring');
  }
}

/**
 * Observer for dynamic content changes
 */
function observeForAds() {
  const observer = new MutationObserver((mutations) => {
    premiumCleanup();
  });

  const targetNode = document.querySelector('ytd-app') || document.body;
  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });

  console.log('[Ad Cleanup] DOM observer started');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPremiumCleanup();
    observeForAds();
  });
} else {
  initPremiumCleanup();
  observeForAds();
}

// Also initialize on window load
window.addEventListener('load', () => {
  initPremiumCleanup();
});

// Clean up when leaving the page
window.addEventListener('beforeunload', stopPremiumCleanup);