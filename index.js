chrome.runtime.connect({ name: "sample-extension" });

chrome.devtools.panels.create(
    "Sample Extension",
    "img/cool.png",
    "panel.html"
);
