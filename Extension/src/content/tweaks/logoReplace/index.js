/**
 * YouTube Logo Replacement
 * Replaces the default YouTube logo with Premium logo
 */

import { LogoPaths } from "./paths";
import { LogoStyles as css } from './styles';

/**
 * Load and replace YouTube logo
 */
function loadLogoReplacement() {
  if (!LogoPaths || !css) {
    console.log("[Logo Replace] No logo or CSS defined");
    return;
  }

  // Desktop YouTube logo replacement
  if (document.getElementById("logo-icon")) {
    const logoIcons = document.querySelectorAll("#logo-icon");
    logoIcons.forEach((logoIcon) => {
      logoIcon.insertAdjacentHTML("afterend", LogoPaths);

      const cssfile1 = document.getElementById("ext-styles");
      if (cssfile1) {
        cssfile1.insertAdjacentHTML("afterend", css);
      } else {
        // If ext-styles doesn't exist, add to head
        const styleElement = document.createElement("style");
        styleElement.textContent = css;
        document.head.appendChild(styleElement);
      }

      logoIcon.remove();
    });
    console.log("[Logo Replace] Desktop logo replaced");
  }
  // Mobile YouTube logo replacement
  else {
    const homeIcon = document.getElementsByTagName("ytm-home-logo")[0];
    if (homeIcon) {
      const newDiv = document.createElement("new-icon");
      newDiv.innerHTML = LogoPaths;
      homeIcon.parentNode.prepend(newDiv);

      const styleElement = document.createElement("style");
      styleElement.textContent = css;
      document.head.appendChild(styleElement);

      homeIcon.style.display = "none";
      console.log("[Logo Replace] Mobile logo replaced");
    }
  }
}

/**
 * Wait for logo elements to be available
 */
function waitForLogo() {
  const checkInterval = setInterval(() => {
    const desktopLogo = document.getElementById("logo-icon");
    const mobileLogo = document.getElementsByTagName("ytm-home-logo")[0];

    if (desktopLogo || mobileLogo) {
      clearInterval(checkInterval);
      loadLogoReplacement();
    }
  }, 100);

  // Stop checking after 10 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
  }, 10000);
}

// Initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForLogo);
} else {
  waitForLogo();
}

// Also try on window load as backup
window.addEventListener("load", () => {
  setTimeout(loadLogoReplacement, 500);
});
