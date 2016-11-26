var isOn = false;
var time = 1500;

function handleNewTab(tab) {
	if(!isOn) {
		if(tab.index !== 0) {
			chrome.tabs.remove(tab.id);
		}
	}
}

function handleNewWindow(window) {
	chrome.windows.getAll(function(windows) {
		if(windows.length !== 1) {
			chrome.windows.remove(window.id);
		}
	});
}

function keepTime() {
	while(time !== 0) {
		--time;
	}
}

chrome.tabs.onCreated.addListener(handleNewTab);
chrome.windows.onCreated.addListener(handleNewWindow);
chrome.runtime.onStartup.addListener(keepTime);