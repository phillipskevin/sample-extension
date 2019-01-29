const s = document.createElement("script");
s.src = chrome.extension.getURL("injected.js");
document.body.appendChild(s);
