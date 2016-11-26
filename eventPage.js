function handleCreated(tab) {
	console.log(tab)
    chrome.tabs.remove(tab.id);
}

chrome.tabs.onCreated.addListener(handleCreated);