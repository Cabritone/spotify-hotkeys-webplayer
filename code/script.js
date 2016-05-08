function executeAction(command) {

	var callback = function(tabs) {

		// Open a new spotify tab if one does not exist yet.
		if (tabs.length === 0) {
		  chrome.tabs.create({url: 'https://play.spotify.com'});
		}

		var code = "document.getElementById('app-player').contentDocument.getElementById('" + command + "').click()";

		// Apply command on all spotify tabs.
		for (var tab of tabs) {
		  chrome.tabs.executeScript(tab.id, {code: code});
		}
		  
		// Unload background page as soon as we're done.
		window.close();
	};

	chrome.tabs.query({url: 'https://play.spotify.com/*'}, callback);
	//chrome.tabs.query({url: 'https://player.spotify.com/*'}, callback);
};

chrome.commands.onCommand.addListener(executeAction);
