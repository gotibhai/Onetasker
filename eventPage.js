var isOn = false;
var initialTime = new Date();
var wholeTime = 1500;

function handleNewTab(tab) {
	if(!isOn) {
		if(tab.index !== 0) {
			chrome.tabs.remove(tab.id);
		}
	} else {
		isOn = false;
	}
}

function handleNewWindow(window) {
	chrome.windows.getAll(function(windows) {
		if(windows.length !== 1) {
			chrome.windows.remove(window.id);
		}
	});
}

function getTime() {
	var curTime = new Date();
	var elapsed = Math.abs(curTime - initialTime)/1000;
	if(elapsed >= 300) {
		chrome.tabs.getAllInWindow (function(tabs) {
			for(var i = 1; i<tabs.length; i++) {
				chrome.tabs.remove(tabs[i].id);
				wholeTime = 1500;
			}
		})
		return wholeTime;
	} else {
		return elapsed;
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.tabs.onCreated.addListener(handleNewTab);
chrome.windows.onCreated.addListener(handleNewWindow);

// var openWindowCount = 0;

// chrome.windows.onCreated.addListener(function(Window window) {
//  	if(++openWindowCount === 1) {

//  		initialTime = new Date();
//  	}
// });

// chrome.windows.onRemoved.addListener(function(windowId) {
// 	--openWindowCount;
// });
