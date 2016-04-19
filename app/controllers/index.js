/**
 * self-executing function to organize otherwise inline constructor code
 * @param  {Object} args arguments passed to the controller
 */
Alloy.Globals.pace = [];
/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {

	/**
	 * Handle to the Navigation Controller
	 */
	navGroup: $.nav,

	open: function(controller, payload){
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.navWin.openWindow(win);
		}
		else if(OS_MOBILEWEB){
			$.navWin.open(win);
		}
		else {

			// added this property to the payload to know if the window is a child
			if (payload.displayHomeAsUp){

				win.addEventListener('open',function(evt){
					var activity=win.activity;
					activity.actionBar.displayHomeAsUp=payload.displayHomeAsUp;
					activity.actionBar.onHomeIconItemSelected=function(){
						evt.source.close();
					};
				});
			}
			win.open();
		}
	}
};

(function constructor(args) {
	// use strict mode for this function scope
	'use strict';
	
	if (OS_IOS) {

		// open SplitWindow for iPad
		if (Alloy.isTablet) {
			$.splitWin.open();

			// open NavigationWindow for iPhone
		} else {
			$.navWin.open();
		}

		// open NavigationGroup's wrapper Window for MobileWeb
	} else if (OS_MOBILEWEB) {
		$.win.open();

		// open master controller's Window view for Android (and other platforms)
	} else {
		$.listCtrl.getView().open();
	}

	// execute constructor with optional arguments passed to controller
})(arguments[0] || {});



