function executeAction(command) {

	var callback = function(tabs) {
		
		console = chrome.extension.getBackgroundPage().console;
		
		// Open a new spotify tab if one does not exist yet.
		if (tabs.length === 0) {
		  chrome.tabs.create({url: 'https://open.spotify.com'});
		}

		var action = "";
		switch(command){
			case "play-pause":
				action = "spoticon-play-16";
				break;
			case "next": 
				action = "spoticon-skip-forward-16";
				break;
			case "previous":
				action = "spoticon-skip-back-16";
				break;
			case "shuffle": 
				action = "spoticon-shuffle-16";
				break;
			case "repeat": 
				action = "spoticon-repeat-16";
				break;
		}
		
		var code = "";
		
		code = '(document.getElementsByClassName("'+action+'")[0] || document.getElementsByClassName("spoticon-pause-16")[0]).click()';
				
		// Apply command on all spotify tabs.
		for (var tab of tabs) {
		  chrome.tabs.executeScript(tab.id, {code: code});
		}
		  
		// Unload background page as soon as we're done.
		window.close();
	};

	chrome.tabs.query({url: 'https://open.spotify.com/*'}, callback);
	//chrome.tabs.query({url: 'https://player.spotify.com/*'}, callback);
};

chrome.commands.onCommand.addListener(executeAction);
