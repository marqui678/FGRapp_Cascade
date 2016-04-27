// Arguments passed into this controller can be accessed via the `$.args` object directly or:
(function constructor(args) {

	// use strict mode for this function scope
	'use strict';

	// model passed to the controller
	var link = args;

	// set the Window title and WebView URL
	//$.win.title = model.get('title').toString();
	$.webView.url = link;

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});

/**
 * Event listener set via view to be called on when the user taps the home-icon (Android)
 */
function close() {
	'use strict';

	// close the window, showing the master window behind it
	$.win.close();
}
