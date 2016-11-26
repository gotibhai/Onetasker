function handleNewTab(tab) {
	if(tab.index !== 0) {
		chrome.tabs.remove(tab.id);
	}
}

function handleNewWindow(window) {
	if(window.index !== 0) {
		chrome.windows.remove(window.id);
	}
}

chrome.tabs.onCreated.addListener(handleNewTab);
chrome.windows.onCreated.addListener(handleNewWindow);
